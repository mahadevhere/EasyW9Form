import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function clearData() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
  }
  
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  
  const Draft = mongoose.models.Draft || mongoose.model('Draft', new mongoose.Schema({}));
  
  const result = await Draft.deleteMany({});
  console.log(`Deleted ${result.deletedCount} drafts.`);
  
  process.exit(0);
}

clearData();
