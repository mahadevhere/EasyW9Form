import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { 
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    }).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the cached promise so next call retries instead of reusing a failed promise
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// ---- SCHEMAS ----

const DraftSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true },
  isPaid: { type: Boolean, default: false },
  ipAddress: { type: String },
  deliveryStatus: { type: String, default: 'Captured' },
}, { timestamps: true });

const Draft = mongoose.models.Draft || mongoose.model('Draft', DraftSchema);

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

const SettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed }
});
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

// ---- API FUNCTIONS ----

export async function saveDraft(formId, _formData, email = null, ip = null) {
  await connectToDatabase();
  // Zero-retention: we only store email + IP for lead tracking, never sensitive form data
  return await Draft.findOneAndUpdate(
    { formId },
    { $set: { email: email ? email.toLowerCase() : null, ipAddress: ip } },
    { upsert: true, new: true }
  );
}

export async function getDraft(formId) {
  await connectToDatabase();
  return await Draft.findOne({ formId }).lean();
}

export async function markAsPaid(formId, email, ip = null) {
  await connectToDatabase();
  return await Draft.findOneAndUpdate(
    { formId },
    { $set: { isPaid: true, email: email.toLowerCase(), ipAddress: ip } },
    { new: true }
  );
}

export async function updateDeliveryStatus(formId, status) {
  await connectToDatabase();
  return await Draft.findOneAndUpdate({ formId }, { $set: { deliveryStatus: status } });
}

export async function getAdminByEmail(email) {
  await connectToDatabase();
  return await Admin.findOne({ email }).lean();
}

/** 
 * Admin dashboard: get all drafts as profiles
 */
export async function getProfiles() {
  await connectToDatabase();
  const drafts = await Draft.find({}).sort({ updatedAt: -1 }).lean();
  
  const profilesMap = {};
  drafts.forEach(d => {
    const email = d.email || `anonymous-${d.formId}`;
    if (!profilesMap[email]) {
      profilesMap[email] = {
        email,
        userTag: d.email ? d.email.split('@')[0] : 'Guest',
        paidDocs: []
      };
    }
    if (d.isPaid) {
      profilesMap[email].paidDocs.push({
        date: d.updatedAt,
      });
    }
  });

  return Object.values(profilesMap);
}

export async function clearAllDrafts() {
  await connectToDatabase();
  await Draft.deleteMany({});
  // Update the revenue start time to NOW so test payments are hidden
  return await Settings.findOneAndUpdate(
    { key: 'revenue_start_time' },
    { value: Date.now() },
    { upsert: true, new: true }
  );
}

export async function getRevenueStartTime() {
  await connectToDatabase();
  const setting = await Settings.findOne({ key: 'revenue_start_time' }).lean();
  return setting ? setting.value : 0;
}
