#!/bin/bash
# see more here: http://danilko.blogspot.com/2014/07/openshift-git-history-clean-up.html
# change repo name as you want
remote_repo=openshift

# Reference from the article http://stackoverflow.com/questions/11929766/how-to-delete-all-git-commits-except-the-last-five

current_branch="$(git branch --no-color | cut -c3-)" ;

current_head_commit="$(git rev-parse $current_branch)" ;

echo "Current branch: $current_branch $current_head_commit" ;

# A B C D (D is the current head commit), B is new_history_begin_commit

new_history_begin_commit="$(git rev-parse $current_branch~1)" ;

echo "Recreating $current_branch branch with initial commit $new_history_begin_commit ..." ;

git checkout --orphan new_start $new_history_begin_commit ;

git commit -C $new_history_begin_commit ;

git rebase --onto new_start $new_history_begin_commit $current_branch;

git branch -d new_start ;

git reflog expire --expire=now --all;

git gc --prune=now;

# Still require a push for remote to take effect, otherwise the push will not go through as there is no change

if [ -f .invoke_update ];
then
      rm -rf .invoke_update;
else
      touch .invoke_update;
fi

git add -A .;

current_date=`date`;

git commit -m "Force clean up history $current_date";

git push $remote_repo master --force;