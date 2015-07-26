/**
 * Service "days"
 */
;(function(){

  function days($resource, localDates, sampleData, numAvailableHorses){

    var sampleDays;

    var resource = $resource('/days/:date');

    /**
     * Returns the day that corresponds with the given
     * date.
     */
    function byDate(localDate){

      if((typeof localDate) === 'string'){
        localDate = localDates.fromIso8601(localDate)
      }

      if(!sampleDays){
        sampleDays = {};
        initializeSampleData(localDate).forEach(function(d){
          sampleDays[d.localDate.asStr] = d;
        });
      }

      if(!sampleDays[localDate.asStr]){
        sampleDays[localDate.asStr] = {
          localDate: localDate,
          outings: []
        };
      }

      var sampleOutings = sampleDays[localDate.asStr].outings;
      sampleOutings.forEach(function(so){
        so.id = -1;
        so.confirmed=true;
      });

      var pm = resource.get({date: localDate.asStr}).$promise;

      pm.then(function(data){
        if(!data.outings){
          data.outings = [];
        }

        // Placeholder reservations array. Only necessary
        // until implemented in backend
        data.outings.forEach(function(o){o.reservations = []; })

        if(sampleOutings.length) {
          data.outings = sampleOutings;
        }
      });

      return pm;

    }

    /**
     * Generates a reservation with random data. Useful for
     * populating sample data.
     */
    function randomReservation(){

      var numPersons = Math.floor(Math.random() * 5) + 1;

      return {
        name: sampleData.getRandomName()
        ,phone: sampleData.getRandomPhone()
        ,numPersons: numPersons
        ,customerSkillLevels: generateRandomSkillLevels(numPersons)
      }
    }

    function generateRandomSkillLevels(numPersons){
      var generatedMap = {};
      var possibleSkills = ["NS", "SP", "S"];
      var remainingPersons = numPersons;
      var maxIterations = 10; //Safety net since there is a bug somewhere
      while(remainingPersons && maxIterations) {
        var skillsToChooseFrom = possibleSkills.slice();
        Object.getOwnPropertyNames(generatedMap).forEach(function(level){
          remove(skillsToChooseFrom, level);
        });
        var personsToHaveThisSkill;
        if(skillsToChooseFrom.length === 1){
          personsToHaveThisSkill = remainingPersons;
        } else {
          personsToHaveThisSkill = Math.min(Math.floor(Math.random() * numPersons * 2 + 1), remainingPersons);
        }
        var skill = getRandom(skillsToChooseFrom);
        generatedMap[skill] = personsToHaveThisSkill;
        remainingPersons -= personsToHaveThisSkill;
        maxIterations--;
      }

      var result = [];
      possibleSkills.forEach(function(skill){
        if(generatedMap[skill]){
          result.push({
            skillLevel: skill,
            numPersons: generatedMap[skill]
          })
        }
      });

      return result ;
    }

    function remove(array, element){
      var index = array.indexOf(element);
      if (index > -1) {
        array.splice(index, 1);
      }
    }

    function getRandom(array){
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    }

    var skillLevels = [
      {
        code: "NS"
      },{
        code: "SP"
      },{
        code: "S"
      }
    ];

    /**
     * Generates some sample data. This will no longer be needed
     * when the app is wired to the backend.
     */
    function initializeSampleData(localDate){
      var days = [
        {
          localDate: localDate.prevDay().prevDay(),
          outings: [
            {
              name: "Fustam",
              time: "09:00"
            },{
              name: "Mitjana",
              time: "12:00"
            },{
              name: "Fustam",
              time: "18:00"
            }
          ]
        },{
          localDate: localDate.prevDay(),
          outings: [
            {
              name: "Fustam",
              time: "10:00"
            },{
              name: "Mitjana",
              time: "12:30"
            },{
              name: "Fustam",
              time: "19:00"
            }
          ]
        },{
          localDate: localDate,
          outings: [
            {
              name: "Fustam",
              time: "09:00"
            },{
              name: "Mitjana",
              time: "16:30"
            },{
              name: "Fustam",
              time: "18:00"
            }
          ]
        },{
          localDate: localDate.nextDay(),
          outings: [
            {
              name: "Fustam",
              time: "09:00"
            },{
              name: "Mitjana",
              time: "16:30"
            },{
              name: "Fustam",
              time: "18:00"
            }
          ]
        },{
          localDate: localDate.nextDay().nextDay(),
          outings: [
            {
              name: "Fustam",
              time: "09:00"
            },{
              name: "Mitjana",
              time: "17:00"
            },{
              name: "Fustam",
              time: "18:30"
            }
          ]
        }
      ];

      days.forEach(function(d){
        d.outings.forEach(function(o){
          o.reservations = o.reservations || [];

          var freeSpaces = numAvailableHorses;
          var i = Math.floor(Math.random() * 10);
          while(i>0){
            var rv = randomReservation();
            if(rv.numPersons <= freeSpaces){
              o.reservations.push(rv);
              freeSpaces -= rv.numPersons;
            }
            i--;
          }
        });
      })

      return days;
    }

    return {
      byDate: byDate
    }
  }

  angular.module("saddle")
    .factory("days", ["$resource", "localDates", "sampleData", "numAvailableHorses", days]);

}());