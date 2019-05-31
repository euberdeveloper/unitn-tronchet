# unitn-statistica
A nodejs server and an Angular 7 frontend to simulate daily assignments of unitn-informatica statistic course

__link to the site:__ [https://unitn-statistica.herokuapp.com/index](https://unitn-statistica.herokuapp.com/index)

## Project purpose:
These is a project consisting on a server where simulation scripts to get aproximated solutions of unitn-informatica statistic course's daily assignments are published. The server serves a site where you can choose the exercise, insert your own exercise data/parameters and run the simulation

## Why is this project useful for lots of students
Let's say that a new assignment asks to solve a statistic problem and the problem is to calculate the probability of getting number three after a six-faced dice is tossed. There are two possibilities to solve the problem. The **first** is solving the problem, by applying math rules. This is the best way, but you must be good and you are never 100% sure of doing the exercise right. The **second** is to execute by hand the experiment and get an aproximate result. The more iterations you do, the better the result is. In this case, let's say you should toss a dice ten million times and count how many times the number three is came up. You can't mistake it, but it is quite long. So, I made a **third** way, wich is **computer simulation**. I make a script simulate a dice toss millions of times and count how many times number three is came up. So you get a good approximated solution and you don't have to lose tons of your time.

## When to use it
**This project is based on computer simulations. Neither it gives perfect solutions nor it provides you the steps needed to solve it mathematically. You still have to solve your exercises by yourself - the only advantage is that you will never be unsure again, you only will need to check if the results are similar to the simulated ones.**

NB: Sometimes, expecially when exercises seems impossible to simulate, the simulation scripts run so super-fast that you even won't see the loading spinner. Neither if you iterate it billions of times. Ostensibly, you could think that they are not simulated at all, that I put only a formula or solving algorithm, but still they are simulated, trust me...

## How to use it

* Go to the website: [https://unitn-statistica.herokuapp.com/index](https://unitn-statistica.herokuapp.com/index)
* Type the credentials (__lagrange__, __lagragna__) and select the exercise date. If you are offline or there was not an exercise in that date, an error toast will be desplayed.
![Index](https://github.com/euberdeveloper/unitn-statistica/blob/master/doc/index.png)
* Insert your exercises' values/parameters, by carefully following the fields instructions. Put a big number, one million or something, in the test iterations field. The bigger you put, the better you'll get but the longer you'll wait.
![Index](https://github.com/euberdeveloper/unitn-statistica/blob/master/doc/exercise_form.png)
![Index](https://github.com/euberdeveloper/unitn-statistica/blob/master/doc/exercise_form_filled.png)
* Wait till the script has finished to execute. There is a pretty loading spinner wich shows you the current progress.
![Index](https://github.com/euberdeveloper/unitn-statistica/blob/master/doc/exercise_loading.png)
* Check the solutions.
![Index](https://github.com/euberdeveloper/unitn-statistica/blob/master/doc/exercise_solutions.png)

## How it was made
The server was made with **Javascript**, specifically by using **NodeJs**. It sends to the client js scripts to run the simulations and serves the frontend. The frontend was made with **Angular**, by using **Angular Material** and **Angular Flexbox** for the style and **Angular Universal** to have an efficient server-side rendering. There is also the **Angular Service Worker**, wich makes the site a **pwa**.

## How to build it
If you are a developer and want to build it locally, download the project, install `node`, run `npm i` in the project directory and then you shall run `node main.local` to start a local server (out of heroku) serving the site and listening to port 8000. The frontend http domain should change to 'http://localhost:8000' to comunicate with the local server and be recompiled by moving to its directory, `cd angular` and by running `npm run build:ssr`.

## Project structure:

Made with [dree](https://github.com/euberdeveloper/dree)

```
unitn-statistica
 ├─> angular
 │   ├── angular.json
 │   ├── ngsw-config.json
 │   ├── package-lock.json
 │   ├── package.json
 │   ├─> src
 │   │   ├─> app
 │   │   ├─> assets
 │   │   │   └─> icons
 │   │   ├── favicon.ico
 │   │   ├── index.html
 │   │   ├── main.server.ts
 │   │   ├── main.ts
 │   │   ├── manifest.webmanifest
 │   │   ├── robots.txt
 │   │   ├── styles.scss
 │   │   ├── tsconfig.app.json
 │   │   ├── tsconfig.server.json
 │   │   ├── tsconfig.spec.json
 │   │   └── tslint.json
 │   ├── tsconfig.json
 │   └── tslint.json
 ├── app.json
 ├─> exercises
 │   ├── 2019-03-14.js
 │   ├── 2019-03-15.js
 │   └── exercises.js
 ├─> frontend
 │   ├─> browser
 │   └─> server
 ├── logo.svg
 ├── main.js
 ├── main.local.js
 ├── package-lock.json
 ├── package.json
 ├── Procfile
 └─> utilities
     ├── redirect.js
     └── serializer.js
```
