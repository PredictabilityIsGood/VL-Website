git subtree split --prefix=dist -b pages-tmp
git push -f origin pages-tmp:gh-pages
git branch -D pages-tmp