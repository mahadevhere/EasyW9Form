// indexnow-sitemap-submitter.js
// Script to submit all URLs from sitemaps to IndexNow API for multiple domains

const https = require('https');
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Configuration - UPDATE THESE VALUES
const API_KEY = 'B4AF113BE1B98DFC9A6A3204AFC5F0E9'; // Your IndexNow API key

// Array of projects/domains to process
const PROJECTS = [
    {
        domain: 'easyw9form.com',
        sitemapUrl: 'https://www.easyw9form.com/sitemap.xml',
        keyLocation: `https://www.easyw9form.com/${API_KEY}.txt`
    }
];

// IndexNow API endpoint
const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';

// Batch size (IndexNow accepts up to 10,000 URLs per batch, but let's use 500 for safety)
const BATCH_SIZE = 1000;

// Delay between batches (in milliseconds) to avoid rate limiting
const BATCH_DELAY = 2000;

/**
 * Fetch and parse sitemap XML
 */
async function fetchSitemap(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                if (response.statusCode !== 200) {
                    return reject(new Error(`Failed to fetch sitemap ${url}, status code: ${response.statusCode}`));
                }

                try {
                    const parser = new XMLParser({
                        ignoreAttributes: false,
                        attributeNamePrefix: '@_'
                    });
                    const result = parser.parse(data);

                    // Extract URLs from sitemap
                    let urls = [];

                    // Handle different sitemap structures
                    if (result.urlset && result.urlset.url) {
                        const urlEntries = Array.isArray(result.urlset.url)
                            ? result.urlset.url
                            : [result.urlset.url];
                        urls = urlEntries.map(entry => entry.loc);
                    } else if (result.sitemapindex && result.sitemapindex.sitemap) {
                        // If it's a sitemap index, recursively fetch each sitemap
                        console.log(`Sitemap index detected for ${url}, fetching child sitemaps...`);
                        const sitemaps = Array.isArray(result.sitemapindex.sitemap)
                            ? result.sitemapindex.sitemap
                            : [result.sitemapindex.sitemap];

                        const promises = sitemaps.map(sm => fetchSitemap(sm.loc));
                        return Promise.all(promises).then(results => {
                            resolve(results.flat());
                        });
                    }

                    console.log(`Found ${urls.length} URLs in sitemap: ${url}`);
                    resolve(urls);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow(project, urls, batchNumber) {
    const payload = {
        host: project.domain,
        key: API_KEY,
        keyLocation: project.keyLocation,
        urlList: urls
    };

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(payload);

        const options = {
            hostname: 'api.indexnow.org',
            path: '/IndexNow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                console.log(`[${project.domain}] [Batch ${batchNumber}] Response: ${res.statusCode} - ${res.statusMessage}`);

                if (res.statusCode === 200) {
                    console.log(`[${project.domain}] [Batch ${batchNumber}] Successfully submitted ${urls.length} URLs`);
                    resolve({ success: true, statusCode: res.statusCode });
                } else if (res.statusCode === 202) {
                    console.log(`[${project.domain}] [Batch ${batchNumber}] Accepted ${urls.length} URLs (Success)`);
                    resolve({ success: true, statusCode: res.statusCode });
                } else if (res.statusCode === 403) {
                    console.error(`[${project.domain}] [Batch ${batchNumber}] Forbidden - Check your API key and key location`);
                    reject(new Error(`HTTP ${res.statusCode}: Invalid key`));
                } else if (res.statusCode === 422) {
                    console.error(`[${project.domain}] [Batch ${batchNumber}] Unprocessable Entity - URLs may not belong to host`);
                    reject(new Error(`HTTP ${res.statusCode}: Invalid URLs`));
                } else if (res.statusCode === 429) {
                    console.warn(`[${project.domain}] [Batch ${batchNumber}] Too Many Requests - Rate limited`);
                    reject(new Error(`HTTP ${res.statusCode}: Rate limited`));
                } else {
                    console.warn(`[${project.domain}] [Batch ${batchNumber}] Unexpected response: ${res.statusCode}`);
                    reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error(`[${project.domain}] [Batch ${batchNumber}] Request error:`, error.message);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

/**
 * Split array into batches
 */
function batchArray(array, batchSize) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
        batches.push(array.slice(i, i + batchSize));
    }
    return batches;
}

/**
 * Save results to a log file
 */
function saveResults(allResults, filename = 'indexnow-submission-results.json') {
    const logData = {
        timestamp: new Date().toISOString(),
        projects: allResults.map(p => ({
            domain: p.domain,
            totalUrls: p.totalUrls,
            batchesProcessed: p.batches.length,
            successfulBatches: p.successfulBatches,
            failedBatches: p.failedBatches,
            details: p.batches.map(batch => ({
                batchNumber: batch.number,
                urlCount: batch.urls.length,
                success: batch.success,
                statusCode: batch.statusCode,
                error: batch.error
            }))
        }))
    };

    fs.writeFileSync(filename, JSON.stringify(logData, null, 2));
    console.log(`\nResults saved to ${filename}`);
}

/**
 * Create the key file
 */
function createKeyFile() {
    const keyFilePath = `${API_KEY}.txt`;
    fs.writeFileSync(keyFilePath, API_KEY);
    console.log(`\nKey file created locally: ${keyFilePath}`);
    console.log(`IMPORTANT: Upload this file to the root directory of your projects:`);
    PROJECTS.forEach(p => {
        console.log(` -> ${p.keyLocation}`);
    });
    console.log(`Make sure it's accessible publicly before running submission!\n`);
}

/**
 * Process a single project
 */
async function processProject(project) {
    console.log(`\n======================================`);
    console.log(`Processing Domain: ${project.domain}`);
    console.log(`Sitemap: ${project.sitemapUrl}`);
    console.log(`Key Location: ${project.keyLocation}`);
    console.log(`======================================\n`);

    const results = {
        domain: project.domain,
        totalUrls: 0,
        batches: [],
        successfulBatches: 0,
        failedBatches: 0
    };

    console.log(`Step 1: Fetching sitemap for ${project.domain}...`);
    let urls;
    try {
        urls = await fetchSitemap(project.sitemapUrl);
    } catch (error) {
        console.error(`Failed to fetch sitemap for ${project.domain}:`, error.message);
        return results;
    }

    // Filter URLs to ensure they match the domain (required by IndexNow)
    urls = urls.filter(url => url.includes(project.domain));

    if (urls.length === 0) {
        console.error(`No valid URLs found in sitemap for ${project.domain}`);
        return results;
    }

    results.totalUrls = urls.length;
    console.log(`Step 2: Processing ${urls.length} URLs for ${project.domain}...\n`);

    // Split URLs into batches
    const batches = batchArray(urls, BATCH_SIZE);
    console.log(`Created ${batches.length} batches of up to ${BATCH_SIZE} URLs each\n`);

    // Submit each batch
    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        const batchNumber = i + 1;

        console.log(`[${project.domain}] Processing batch ${batchNumber}/${batches.length} (${batch.length} URLs)...`);

        try {
            const response = await submitToIndexNow(project, batch, batchNumber);
            results.batches.push({
                number: batchNumber,
                urls: batch,
                success: true,
                statusCode: response.statusCode,
                error: null
            });
            results.successfulBatches++;
        } catch (error) {
            results.batches.push({
                number: batchNumber,
                urls: batch,
                success: false,
                statusCode: error.statusCode || null,
                error: error.message
            });
            results.failedBatches++;
            console.error(`[${project.domain}] Failed to submit batch ${batchNumber}: ${error.message}`);
        }

        // Delay between batches (except after the last one)
        if (i < batches.length - 1) {
            console.log(`Waiting ${BATCH_DELAY}ms before next batch...\n`);
            await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
    }

    return results;
}

/**
 * Main execution function
 */
async function main() {
    console.log('=== IndexNow Multi-Domain Sitemap Submitter ===\n');
    console.log(`Global API Key: ${API_KEY}`);
    console.log(`Batch Size: ${BATCH_SIZE}`);
    console.log(`Domains to process: ${PROJECTS.map(p => p.domain).join(', ')}`);
    console.log('-----------------------------------\n');

    // Create key file locally (optional)
    createKeyFile();

    const allResults = [];

    // Process each project sequentially
    for (const project of PROJECTS) {
        const result = await processProject(project);
        allResults.push(result);

        // Wait before processing next project
        console.log(`\nWaiting 5 seconds before processing next domain...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    // Display overall summary
    console.log('\n======================================');
    console.log('=== Overall Submission Summary ===');
    console.log('======================================');

    allResults.forEach(r => {
        console.log(`\nDomain: ${r.domain}`);
        console.log(`  Total URLs: ${r.totalUrls}`);
        console.log(`  Total Batches: ${r.batches.length}`);
        console.log(`  Successful: ${r.successfulBatches}`);
        console.log(`  Failed: ${r.failedBatches}`);

        if (r.failedBatches > 0) {
            console.log(`  Failed batches:`);
            r.batches
                .filter(b => !b.success)
                .forEach(b => {
                    console.log(`    Batch ${b.number}: ${b.error}`);
                    console.log(`      URLs: ${b.urls.slice(0, 3).join(', ')}${b.urls.length > 3 ? '...' : ''}`);
                });
        }
    });

    // Save results
    saveResults(allResults);

    console.log('\n=== Next Steps ===');
    console.log('1. Upload the key file to your servers at:');
    PROJECTS.forEach(p => console.log(`   - ${p.keyLocation}`));
    console.log('2. Verify the key file is accessible in your browser');
    console.log('3. Check Bing Webmaster Tools to verify URL submissions');
}

// Run the script
main().catch(error => {
    console.error('Script error:', error);
    process.exit(1);
});