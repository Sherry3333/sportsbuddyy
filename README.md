# CS732 project - Team Iridescent Impalas

Welcome to the CS732 project. We look forward to seeing the amazing things you create this semester! This is your team's repository.

Your team members are:
- Jinbo Hu _(jhu098@aucklanduni.ac.nz)_
- Fengxian Shao _(fsha335@aucklanduni.ac.nz)_
- Zhenglin Yang _(zyan532@aucklanduni.ac.nz)_
- Shanshan Gao _(sgao813@aucklanduni.ac.nz)_
- Ran Yang _(lyan276@aucklanduni.ac.nz)_
- Alex Xue _(sxue311@aucklanduni.ac.nz)_

You have complete control over how you run this repo. All your members will have admin access. The only thing setup by default is branch protections on `main`, requiring a PR with at least one code reviewer to modify `main` rather than direct pushes.

Please use good version control practices, such as feature branching, both to make it easier for markers to see your group's history and to lower the chances of you tripping over each other during development

![](./Iridescent%20Impalas.webp)

# Navigate to your workspace directory. For example: 
`cd  C:\Hisky\workspace\732.`
Or use:
`cd YOUR_WORKSPACE`

# Open Terminal or Powershell and type.
`git clone https://github.com/UOA-CS732-S1-2025/group-project-iridescent-impalas`
If you have installed Git successfully, you will see Git downloading the project on your machine. 

# Navigate into the project folder:
`cd .\group-project-iridescent-impalas\`

# Check your local branches
`git branch`

# Check the remote branches
`git branch -r`

# Swtich the git branch
`git switch HX732-14-hisky.yang`

# To initialize the backend on your local machine, run the following command:
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

# Switch to the main branch:
`git checkout main`

# Pull the latest changes from the remote main branch (if applicable):
`git pull origin main`

# Merge the dev branch into main:
`git merge HX732-14-hisky`

Resolve any merge conflicts (if they occur):
Open the conflicting files.
Edit the files to resolve conflicts.
Mark conflicts as resolved:
`git add <file>`

# Commit the merge (if conflicts were resolved manually):
`git commit`

# Push the updated main branch to the remote repository:
`git push origin main`

