#!/bin/bash
# Fix for ENOSPC: System limit for number of file watchers reached
# This increases the inotify file watcher limit

echo "Current file watcher limit:"
cat /proc/sys/fs/inotify/max_user_watches

echo ""
echo "Increasing file watcher limit to 524288..."
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

echo ""
echo "New file watcher limit:"
cat /proc/sys/fs/inotify/max_user_watches

echo ""
echo "Done! You can now run 'npm run dev'"


