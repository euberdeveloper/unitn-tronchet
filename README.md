# unitn-tronchet

Site where there are simulations of the theoric part of unitn exam "linguaggi di programmazione - mod 1".

__link to the site:__ [https://unitn-tronchet.herokuapp.com](https://unitn-tronchet.herokuapp.com)

## Project purpose:

The UniTN's "Programming Languages" exam's theoric part consists in some code examples in wich the student must find errors or write the output whether there are none and some true or false questions. On the professor's site there are only few examples and the repository with all the old exams has not all the solutions. This is why I made this site, where not only can students see the old exams with the solution, but can enjoy a real simulation, with time and final score.

## How to use it:

* Go to [https://unitn-tronchet.herokuapp.com](https://unitn-tronchet.herokuapp.com)
* If it is the **first time** you use it, it could aks you for the **push notifications permission**, I suggest accepting, because you will receive a notification when a new exam is added or corrections are uploaded
* To login, use the credentials: **USER: abbiamovinto** and **PASSWORD: defacto**
* After the login, you will be reditected to the **homepage**. I really suggest reading the whole text, because it will explain you how to properly use the site
* The topbar's left button opens the menu, where you can select an exam. The topbar's right button logs you out.
* During the simulation, you will see the time as the title of the topbar. A progress bar will show the time too, and the color change in base of the time remained. To pass from an exercise to another **on mobilephones (portrait), you must make a big swipe to the right or to the left**; on landscape position or in all the other devices there are the back and next buttons, in the bottom. In the bottom there are also the pause/play button (pauses/plays time), the refresh button (resets the exams) and the finish button (finishes the exam before time ends). In the exercises with the code, by moving the cursor inside the code container, a copy button will appear to copy all the code text in the dashboard. You will be able to answer the code exercises (radio buttons for the output/compiletime error/runtime error choice and textfields for the output/error's row) or to leave the answer empty. For each true or false question, you will be able to select an answer and deselect it by clicking again on it. In the end of the simulation, the result will be shown; the title of the topbar will show your score, the progressbar and its color will get you a better idea of that. You will be able with the top right buttons to see the solution and your answers.

## How was it made:

The site's frontend has been made with **Vue.js** and **Typescript**, in particular by using the **Vuetify.js** ui framework. **vue-router** has been used for the routing, **Vuex** as the data store and a **service-worker** was added to make the site a **PWA**. With a **Firebase Cloud Messaging"**, if the user agrees when the site gets entered for the first time, I can send **Push Notifications** when for instance I add a new exam or fix a bug. The server was made with **Node.js**, it simply serves the site, hosted with **Heroku**.

## How to build it:

To build the project:

* Install `Node.js`
* Clone the repository
* On the root folder of the repo, execute `npm i` to download the node modules
* The `main.local.js` file is the local server, without all Heroku trash. Without the decrypted firebase config file, push notification will not work. Run `node main.local` to run the local server.
* With a browser, test the site on `http://localhost:8080`
