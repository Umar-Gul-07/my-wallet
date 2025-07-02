import { createBackup, createDatabaseBackup, listBackups } from './backup.js';

console.log('🔄 Starting manual backup...');

const runBackup = async () => {
  try {
    // Create JSON backup
    const jsonBackup = await createBackup();
    console.log('✅ JSON backup created:', jsonBackup.filename);
    
    // Create database backup
    const dbBackup = await createDatabaseBackup();
    console.log('✅ Database backup created:', dbBackup);
    
    // List all backups
    const backups = listBackups();
    console.log('📁 Total backups available:', backups.length);
    
    console.log('🎉 Manual backup completed successfully!');
    console.log('💾 Your data is now safely backed up.');
    
  } catch (error) {
    console.error('❌ Manual backup failed:', error);
    process.exit(1);
  }
};

runBackup(); 