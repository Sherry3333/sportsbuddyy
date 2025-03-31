# CS732 project - Team Iridescent Impalas

## Navigate to your workspace directory. For example: 
`cd  C:\Hisky\workspace\732.`
Or use:
`cd YOUR_WORKSPACE`

## Open Terminal or Powershell and type.
`git clone https://github.com/UOA-CS732-S1-2025/group-project-iridescent-impalas`
If you have installed Git successfully, you will see Git downloading the project on your machine. 

## Navigate into the project folder:
`cd .\group-project-iridescent-impalas\`

## Check your local branches
`git branch`

## Check the remote branches
`git branch -r`

## Swtich the git branch
`git switch HX732-14-hisky.yang`

## To initialize the backend on your local machine, run the following command:
```
cd backend
npm install
npm run init-db
```

The terminal should display:

```
Connected to database
Inserted 5 users into the database
Disconnected from database
```

## Switch to the main branch:
`git checkout main`

## Pull the latest changes from the remote main branch (if applicable):
`git pull origin main`

## Merge the dev branch into main:
`git merge HX732-14-hisky`

Resolve any merge conflicts (if they occur):
Open the conflicting files.
Edit the files to resolve conflicts.
Mark conflicts as resolved:
`git add <file>`

## Commit the merge (if conflicts were resolved manually):
`git commit -m "Merge from main"`

# Push the updated main branch to the remote repository:
`git push origin main`

# Delete your local branch
`git branch -d HX732-15.jinbo`

# Delete remote branch after it's merged to main
`git push origin --delete HX732-15.jinbo`