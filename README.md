# CEx
# Currency-Exchanger By Abanoub Magdy

### Currency-Exchanger made by (Angular) front-end using Single Page Application(SPA) technology. Along with some styling. 
In total 
* 6 components
* 2 services 
* (api) that help us to feed the whole project.
#### also using the app-routing Module to be easy to navigate between components using URLs of each component


# About The Project 
## [Demo]
| [![]()]() | [![]()]() | 
|:---:|:---:|
| **Home**  | **Details**  |
| [![](https://github-production-user-asset-6210df.s3.amazonaws.com/82307701/241774496-d8b075b7-cf10-4f8f-a801-3c3744bc5fa2.png)](http://abanoub5015.github.io/Currency-Exchanger-BM/) | [![](https://github-production-user-asset-6210df.s3.amazonaws.com/82307701/241774740-83a5c67f-ea80-4fbf-8423-dc7945e75f11.png)](http://abanoub5015.github.io/Currency-Exchanger-BM/) |

👉🏻[Here's the website [Currency-Exchanger]](http://abanoub5015.github.io/Currency-Exchanger-BM/)

## [Pages]

* **Home [Currency-Exchanger]** <br/>💡Exchange Currency💡

* **Details** <br/>💡[by clicking on (More Details) ... you will navigate to (Detail page directly that shows currency rate💡

* **404 page** <br/>💡[when user enter wrong url inside the website domain.. using(wild card to navigate from incorrect route)💡


## [Built With]

* [![Angular][Angular.io]][Angular-url]
* 2.Utilize  CSS for styling also the app is responsive(mobile/Desktop)

<!-- download -->
## [Download And installation]

Download this template from [Github](https://github.com/Abanoub5015/Currency-Exchanger-BM/archive/refs/heads/main.zip)


* Install dependencies
```
npm install
```
* Run locally
```
ng serve
```


* ## other Commands
```
npm install --save-dev typescript     
npm install --save-dev @angular/language-service
npm install -g @angular/cli 
ng --version 
  
ng g c components/PageNotFound   
  ng help 
  ng serve --port 3000 
  ng serve --open       
```

* ## for cleaning & fix Commands
```
ng cache clean 
npm config set legacy-peer-deps true  
```

* ## 1.git Commands [// means once]
```
//git init 
//git add README.md  
  git add *
  git commit -m "publish project"  
//git branch -m main 
//git remote add origin https://github.com/Abanoub5015/Currency-Exchanger-BM.git
  git push origin main
git pull origin main 
```

* ## 2.git (deploy-page) Commands [// means once]
```
[1] //npm i -g angular-cli-ghpages
[2] ng build 
[3] ngh --dir dist/c_ex ->[for deploy]
```


* ## 3.after every update:
```
-----------------------------
git add *
git commit -m "update commit"
git push origin main

ng build
ngh --dir dist/c_ex ->[for deploy]
-----------------------------
```




[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

