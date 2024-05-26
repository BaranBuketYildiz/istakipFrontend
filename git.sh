if [ -z "$1" ]; then
    COMMIT_MSG="Auto commit"
else
    COMMIT_MSG="$1"
fi
git add .
git commit -a -m "$COMMIT_MSG"
git pull --no-rebase origin master
git push -u origin master