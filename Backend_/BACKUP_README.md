# 🔒 KakaWallet Data Backup System

Your financial data is precious! This backup system ensures your data is always safe and recoverable.

## 🛡️ Backup Features

### Automatic Backups
- **Every 24 hours**: System automatically creates backups
- **Two types**: JSON data backup + SQLite database backup
- **Location**: `Backend_/backups/` directory
- **Retention**: Keeps last 10 backups to save space

### Manual Backups
- **On-demand**: Create backup anytime from Settings page
- **Command line**: Run `npm run backup` in Backend_ directory
- **API endpoint**: POST `/api/backup/create`

## 📁 Backup Files

### JSON Backup (`kaka_wallet_backup_YYYY-MM-DD_HH-MM-SS.json`)
Contains all your data in readable format:
- All users and their details
- All transactions (money keeping)
- All loan persons and their loans
- Metadata with timestamps and counts

### Database Backup (`kaka_wallet_db_YYYY-MM-DD_HH-MM-SS.sqlite`)
Complete SQLite database copy:
- Exact database state at backup time
- Can be used for full system restore
- Binary format, smaller size

## 🚀 How to Use

### 1. Automatic Backup (Already Running)
The system automatically creates backups every 24 hours. No action needed!

### 2. Manual Backup from Web Interface
1. Go to **Settings** page
2. Click **"Create Backup Now"** button
3. Wait for confirmation message
4. Your data is now backed up!

### 3. Manual Backup from Command Line
```bash
cd Backend_
npm run backup
```

### 4. Check Available Backups
```bash
cd Backend_
ls backups/
```

## 🔄 Restore from Backup

### Emergency Restore (if needed)
1. Stop the server
2. Replace `database/kaka_wallet.sqlite` with backup file
3. Restart the server

### Data Recovery
The JSON backup files can be used to manually restore specific data if needed.

## 📊 Backup Statistics

Each backup includes:
- **Total Users**: Number of people you keep money for
- **Total Loan Persons**: Number of people you gave loans to
- **Total Transactions**: All money keeping transactions
- **Total Loans**: All loan transactions
- **Timestamp**: Exact backup creation time

## 🛡️ Data Protection

### What's Backed Up
✅ All user information (names, emails, phones, addresses)
✅ All money keeping transactions (given/returned)
✅ All loan persons and their details
✅ All loan transactions (given/repaid)
✅ Account balances and status
✅ Transaction history and timestamps

### Security Features
- **Local Storage**: Backups stored on your server only
- **No Cloud**: Your data never leaves your system
- **Encrypted**: Database files are secure
- **Multiple Copies**: Both JSON and SQLite formats

## ⚠️ Important Notes

### Before Making Changes
- Always create a manual backup before major updates
- Test restore process in development environment
- Keep multiple backup copies in different locations

### Backup Location
- **Default**: `Backend_/backups/`
- **Files**: Both `.json` and `.sqlite` files
- **Naming**: Timestamp-based for easy identification

### Storage Management
- System keeps last 10 backups automatically
- Old backups are automatically deleted
- Each backup is typically 1-10 MB depending on data size

## 🆘 Troubleshooting

### Backup Fails
1. Check disk space in `Backend_/backups/` directory
2. Ensure write permissions
3. Check server logs for errors
4. Try manual backup command

### Restore Issues
1. Verify backup file integrity
2. Stop server before restore
3. Test with small backup first
4. Keep original files as backup

## 📞 Support

If you encounter any backup issues:
1. Check the server console logs
2. Verify backup directory exists
3. Ensure database is accessible
4. Try manual backup command

---

**💡 Pro Tip**: Create a backup before any major data changes or system updates!

**🔒 Your data is precious - we protect it like our own!** 