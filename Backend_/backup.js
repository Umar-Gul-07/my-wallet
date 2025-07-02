import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './config/database.js';
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import LoanPerson from './models/LoanPerson.js';
import Loan from './models/Loan.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create backup directory
const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Get timestamp for backup files
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
         now.toTimeString().split(' ')[0].replace(/:/g, '-');
};

// Create comprehensive backup
export const createBackup = async () => {
  try {
    const timestamp = getTimestamp();
    const backupFileName = `kaka_wallet_backup_${timestamp}.json`;
    const backupPath = path.join(backupDir, backupFileName);

    console.log('🔄 Starting backup...');

    // Get all data
    const users = await User.findAll({
      include: [{
        model: Transaction,
        as: 'transactions'
      }]
    });

    const loanPersons = await LoanPerson.findAll({
      include: [{
        model: Loan,
        as: 'loans'
      }]
    });

    // Create backup object
    const backupData = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalUsers: users.length,
        totalLoanPersons: loanPersons.length
      },
      users: users.map(user => user.toJSON()),
      loanPersons: loanPersons.map(person => person.toJSON())
    };

    // Write backup file
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Backup created: ${backupFileName}`);
    return { success: true, filename: backupFileName };

  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  }
};

// Create database file backup
export const createDatabaseBackup = async () => {
  try {
    const timestamp = getTimestamp();
    const dbBackupName = `kaka_wallet_db_${timestamp}.sqlite`;
    const dbBackupPath = path.join(backupDir, dbBackupName);
    
    const originalDbPath = path.join(__dirname, 'database', 'kaka_wallet.sqlite');
    
    if (fs.existsSync(originalDbPath)) {
      fs.copyFileSync(originalDbPath, dbBackupPath);
      console.log(`✅ Database backup created: ${dbBackupName}`);
      return dbBackupName;
    }
  } catch (error) {
    console.error('❌ Database backup failed:', error);
  }
};

// List available backups
export const listBackups = () => {
  try {
    const files = fs.readdirSync(backupDir);
    return files.filter(file => file.endsWith('.json') || file.endsWith('.sqlite'));
  } catch (error) {
    return [];
  }
};

export default { createBackup, createDatabaseBackup, listBackups }; 