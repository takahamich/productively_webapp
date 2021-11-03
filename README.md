# 2021-fall-group-moose

<!-- TABLE OF CONTENTS -->
## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

MOOSE Scheduling app is the ultimate time management application that allows students to manage all their tasks, as well as long-term and short-term goals. Students are able to assign priority to tasks that need to be completed. With the app's feedback system, they can reflect on whether they meet that their daily goals. Time-consuming tasks will automatically be divided in chunks on the students’ calendars, allowing them to more effectively tackle larger tasks. The goal of our app is simple; Impact students by promoting productivity, discourage procrastination, and supporting students to meet their goals.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [React.js](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
* homebrew
  https://brew.sh/

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jhu-oose/2021-fall-group-moose.git
   ```
2. Install NPM packages
   ```sh
   npm install
   npm install --save styled-components
   npm i --save react-big-calendar
   ```
3. Run the server in the currect directory
   ```js
   npm start
   ```
4. Open a new terminal and run the client in the client directory
   ```js
   cd client
   npm start
   ```
   
### Going Beyond CRUD
In order to go beyond CRUD, we created an algorithm that automatically gives users recommendations for future planning based on past task accomplishment. Since we are still developping the app, the following explains the formula as well as how instructors can verify our work:
    
    prodScore = [Sum of (actual time spent today) / Sum of (expected time spent today)]. 
    
    Note: The end of "today" will eventually be defined by the user, but for now, it is set at midnight by default.
    
    Based on the productivity score, the terminal will print out various messages:
    
    (a) < .75 – gets the recommendation "Wow! You're hyper-productive. Feel free to do more things, or just enjoy your day!"
    
    (b) .75 to 1 – gets the recommendation "Yay! You're pretty spot on with your time estimates. Keep it up!"
    
    (c) > 1 and < 1.5 – gets the recommendation "Hmm, do you want to add some buffer time in your day, and plan spend more time on your tasks?"
    
    (d) 1.5+ – gets the recommendation "Oof. Do you need a day off on [day of the week]s? Are you taking a day off at least once a week? Also, do you want to add some buffer time in your day, and plan spend more time on your tasks?"
  
    Additionally, if the prodScore is 1.5+ AND the start time is during a certain time of day (defined below), then a second recommendation is displayed, claiming "Hmm. Maybe you're not a [timeOfDay] person. What do you think about not assigning yourself tasks during [timeOfDay]?" The timeOfDay is defined below:
    
    (a) Start of day until 11:59am, timeOfDay = Morning

    (b) 12pm – 4:59pm, timeOfDay = Afternoon
    
    (c) 5pm – 8:59pm, timeOfDay = Evening

    (d) 9pm – end of day, timeOfDay = Night
    
    For future iterations, we intend to reflect recommendations and productivity scores in our front end, but we did not for this iteration since we were instructed to mostly work on the back end. 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Here's some pictures of our app's current functionalities:
* login page: https://drive.google.com/file/d/1X3XsPNYBNWl33epAO22P7pdT3T66ihoh/view?usp=sharing
* calendar view: https://drive.google.com/file/d/1NCyz7W5xhZiCl_BXgGYAqTOp2axKkR_-/view?usp=sharing
* task form: https://drive.google.com/file/d/1v1PbLV-bKhWjl6JV1edpZpuNoXfsRbzC/view?usp=sharing

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

The following **required** functionality is completed:

- [x] User can click a create task button
- [x] The user can view a right fly out window, where they can add details fo their task such as due date, priority, and task name.
- [x] User can view a calendar in the application's homepage.

The following system requirements are completed:

- [x] Set up our database - MongoDb
- [x] Design layout of our app's homepage using styled components and flexbox
- [x] For iteration 3, most of the work was done for our backend, including sending data to the database, and querying the database (also see Going Beyond CRUD).


See the [open issues](https://github.com/jhu-oose/2021-fall-group-moose/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

For JHU OOSE.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Keidai Lee - elee175@jhu.edu
Shaina Gabala - sgabala2@jhu.edu
Ayo Ajayi - aajayi8@jhmi.edu
Weina Dai  - wdai11@jhu.edu
Nolan Lombardo - nlombar2@jhu.edu
Michiko Takahashi - mtakaha4@jhu.edu



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
Please note that many of pair programmed together to make the process more efficient. Pushes from one person sometimes mean the work of many people. In this particular iteration, please note the following pairings that worked together often:

Keidai and Shaina

<p align="right">(<a href="#top">back to top</a>)</p>


