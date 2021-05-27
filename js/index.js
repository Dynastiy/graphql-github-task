        // Nav controller Button for mobile Screens
        var toggllerbtn = document.getElementById("menutog");
        var sideer = document.getElementById('sidee');

        document.onclick = function(e) {
          if(e.target.id !== "menutog" && e.target.id !== "sidee"){
            sideer.classList.remove('active');
            toggllerbtn.style.opacity = 1
          }
        }

        toggllerbtn.onclick = function(){
        sideer.classList.toggle('active');
        toggllerbtn.style.opacity = 0
        }

        //Graphql API 

        async function getUser() {
          var name = document.getElementById("input").value;

          //Check if input field is empty and returns an error
          if (name === ""){
            let noName = document.getElementById('enter-user');
            noName.style.display = "block";
          }
          const data = JSON.stringify({
            query:`
              query user($username: String!){
                user(login:$username) {
                  name
                  avatarUrl
                  bio
                  repositories(last:20, isFork: false) {
                    nodes {
                      updatedAt
                      primaryLanguage {
                        name
                      }
                      forkCount
                      description
                      stargazerCount
                      name
                      url
                      stargazerCount
                      forkCount
                    }
                  }
                }
              }
            `,
            variables: `{
              "username": "${name}"
            }`
          });
          
          const token = "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"
          const response = await fetch(
            'https://api.github.com/graphql',
            {
              method: 'post',
              body: data,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization':
                   'Bearer ' + token,
              },
            }
            
          );
            
          let userDetails = {};
          let repoDetails = []
          const characterData = await response.json();

          userDetails = characterData.data.user;
          
          document.getElementById("name").textContent = userDetails.name;
          document.getElementById("userImg").src = userDetails.avatarUrl;
          document.getElementById("userImg2").src = userDetails.avatarUrl;
          document.getElementById("bio").textContent = userDetails.bio;

          repoDetails = userDetails.repositories.nodes;

          //Checks if repoDetails is empty and returns and error
          if (repoDetails.length === 0){
            let noUser = document.getElementById('error-no-user');
            let name = document.getElementById("input");
            noUser.style.display = "block"
            name.value = null;
          };

          console.log(repoDetails)
          
          const cont = document.getElementById("right-main");

          for(const repo of repoDetails) {

            //Name of repository
            const headPart = document.createElement('h2');
            headPart.innerText = repo.name;

            //Descripition of Repo
            const para = document.createElement('p');
            para.innerText = repo.description;
            
            //primary Language
            const lang = document.createElement('span');
            if(repo.primaryLanguage === null){
              lang.innerText = null;
            }
            else{
              lang.innerText = repo.primaryLanguage.name;
            }
            
            //Star Gazer Count
            const stargazerCount = document.createElement('span');
            stargazerCount.innerText = '\u2606' +  repo.stargazerCount;

            //Date Last Updated

            const update = document.createElement('span');
            var d = repo.updatedAt;
            var c = new Date(d);
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var n = month[c.getMonth()];
            var day = c.getDate();
            update.innerText = "Updated on " +  n + " " + day;

            //Network Connections 
            const net = document.createElement('span');
            net.textContent = '\u260b' + repo.forkCount;

            //Creating two divs - One to contain the left side of the repo details and the other to contain the right side
            // div for the left side
            const divLeft = document.createElement('div');
            
            // div for the right side
            const divRight = document.createElement('div');

            // div to contain each item
            const divCont = document.createElement('div');
            divCont.classList.add("right-items")

            //Button
            const buut = document.createElement('button');
            buut.classList.add("btnStar");
            buut.textContent = '\u2606' + " " + "Star";

            //Horizontal Rule 
            const line = document.createElement('div');
            line.classList.add("hr");

            // Append the left items to the left div and the button to the right div
            divLeft.appendChild(headPart);
            divLeft.appendChild(para);
            divLeft.appendChild(lang);
            divLeft.appendChild(stargazerCount);
            divLeft.appendChild(net);
            divLeft.appendChild(update);

            divRight.appendChild(buut);

            // Append both divs to the container div
            divCont.appendChild(divLeft);
            divCont.appendChild(divRight);

            // append div to overall container div
            cont.appendChild(divCont);
            cont.appendChild(line);

            //Remove the div container
            const userEnter = document.getElementById('user');
            userEnter.classList.add('active');
          }
          // checking for errors
        };
        