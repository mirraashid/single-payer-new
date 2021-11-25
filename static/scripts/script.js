/**
 * API Container
 */

const fetchData = (payload) => axios({
  method: 'POST',
  url: '/singlePayer/fetch/calc',
  data: payload
});



var current_slide = 1;
var total_slides = $('.slides_container').length && $('.slides_container')[0].childElementCount - 1;
var resultMapping =[
  {
    uid: 'currentInsuranceLastYear_out',
    desc: 'How much you pay now',
    rIndex: 0
  },
  {
    uid: 'currentInsuranceWmc_out',
    desc: '',
    rIndex: 8
  },
  {
    uid: 'spLastYear_out',
    desc: '',
    rIndex: 1
  },
  {
    uid: 'spWmc_out',
    desc: '',
    rIndex: 1
  },
  {
    uid: 'savingsLastYear_out',
    desc: '',
    rIndex: 6
  },
  {
    uid: 'savingsWmc_out',
    desc: '',
    rIndex: 9
  },

];

var questionValidation = {
  1: {
    slide: 1,
    inputs: [
      {
        type: 'radio',
        identifier: 'name',
        iValue: 'spPlan',
        required: true,
        dataType: 'string'
      }
    ]
  },
  3: {
    slide: 3,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'hpPremium',
        required: true,
        dataType: 'int'
      },
      {
        type: 'dropdown',
        identifier: 'id',
        iValue: 'timeframe',
        required: true,
        dataType: 'string'
      }
    ]
  },
  4: {
    slide: 4,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'epc',
        required: true,
        dataType: 'string'
      },
      {
        type: 'dropdown',
        identifier: 'id',
        iValue: 'epcTimeFrame',
        required: true,
        dataType: 'string'
      },
      {
        type: 'dropdown',
        identifier: 'id',
        iValue: 'typeOfWork',
        required: true,
        dataType: 'string'
      }
    ]
  },
  5: {
    slide: 5,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'oop',
        required: true,
        dataType: 'int'
      }
    ]
  },
  6: {
    slide: 6,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'oopLongTerm',
        required: true,
        dataType: 'int'
      }
    ]
  },
  7: {
    slide: 7,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'householdSize',
        required: true,
        dataType: 'int'
      }
    ]
  },
  8: {
    slide: 8,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'householdIncome',
        required: true,
        dataType: 'int'
      }
    ]
  },
  9: {
    slide: 9,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'deductible',
        required: true,
        dataType: 'int'
      }
    ]
  },
  10: {
    slide: 10,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'shareOfCostHospital',
        required: true,
        dataType: 'int'
      },
      {
        type: 'dropdown',
        identifier: 'id',
        iValue: 'shareOfCostHospitalType',
        required: true,
        dataType: 'string'
      }
    ]
  },
  11: {
    slide: 11,
    inputs: [
      {
        type: 'text',
        identifier: 'id',
        iValue: 'annualOop',
        required: true,
        dataType: 'int'
      }
    ]
  }
};

var compactInputs;

var payload = {};

//Additional info for question
const addInfoText = {
  slide_1: '<p>SB 1384 is a Medicare for All bill introduced in 2019 by Rep. Jayapal. See the text <a href="https://www.google.com/url?q=https://www.congress.gov/bill/116th-congress/house-bill/1384/text&sa=D&ust=1608406765536000&usg=AFQjCNGDP2VkdAmR2dqoCfL9shWVek654Q">here</a> and one page summary <a href="https://www.google.com/url?q=https://pnhp.org/system/assets/uploads/2019/02/HouseBillOnePager_2019.pdf&sa=D&ust=1608406765536000&usg=AFQjCNEILPsYIQcTc4dUIOAcR2XzjZZl6A">here</a></p><p>SB 562 is a single payer bill introduced in California by the California Nurse\'s Association. See the bill text <a href="https://www.google.com/url?q=https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id%3D201720180SB562&sa=D&ust=1608406765536000&usg=AFQjCNH3zlvCwU4oaIyNhn67dd-_oXss2A">here</a></p>',
  
  slide_3: '<p>For example, if insured from work report your premium contributions, or if from the ACA exchange report the portion not covered by an ACA subsidy. Please report the total for all insurance.</p><p>Form 1095-A will have this information if you have an ACA exchange plan.</p><p>For employer insurance, this amount might be on your pay stub, or you should be able to ask your employer and they can provide it to you.</p><p>For Medicaid, this amount is usually 0.</p><p>For Medicare, please ask your plan, or your plan documents you recieve each year should have this information.</p>',

  slide_4: '<p>This information should be on your W-2, box 12, code DD.</p>',

  slide_5: '<p>Remember, this includes all over-the-counter spending as well. So things like Advil, cough medicine, feminine hygiene, any health product you buy in your daily life.</p>',

  slide_6: '<p>Long-term care is a range of services and supports you may need to meet your personal care needs. Most long-term care is not medical care, but rather assistance with the basic personal tasks of everyday life. See more <a href="https://www.google.com/url?q=https://longtermcare.acl.gov/the-basics/what-is-long-term-care.html&sa=D&ust=1608406765542000&usg=AFQjCNGChm1a_HVoXdctJRhpDyWfVG7JUA">here</a></p>',

  slide_7: '<p>A household would be taxpayer(s) living in your current residence and any individuals who are claimed as dependents on one federal income tax return. A tax household may include a spouse and/or dependents.</p>',

  slide_8: '<p>This should be the same amount of household annual income you report on your taxes.</p> <p>For wages, this is section 1 on your W-2. Please also include any money recieved outside of your job or in side jobs (like as a 1099 independent contractor) and gifts you may have recieved.</p>',

  slide_9: '<p>For employer insurance, this amount might be on your pay stub, or you should be able to ask your employer and they can provide it to you.</p> <p>For Medicaid, this amount is usually 0.</p> <p>For Medicare, please ask your plan, or your plan documents you recieve each year should have this information.</p> <p>For ACA exchange plans, this information should be online at <a href="healthcare.gov">healthcare.gov</a> or with your plan documents you recieve every year.</p>',

  slide_10: '<p>This should be part of the plan documents that your plan provides you every year. This is often a percentage and can be listed by other names, such as "Doctor Costs Inpatient Surgery".</p>',

  slide_11: '<p>This should be part of the plan documents that your plan provides you every year. It is often labeled as "Annual Out of Pocket Maximum".</p>',

}


/**
 * Update progress bar
 * @author Rashid
 */
const updateProgressBar = () => {
     //Progress Bar Varibles
     let progress_elem = document.getElementById("myBar");
     let progress_percentage = document.getElementById("progress_percentage");
     let progress_width;

     //Update Progress Bar
     progress_width = (current_slide / total_slides) * 300;
     progress_elem.style.width = progress_width + 'px';
     progress_percentage.innerHTML = Math.ceil((current_slide / total_slides) * 100) + '% Complete';

}

/**
 * Handle navigation buttons
 * @author Rashid
 */

 const handleNavigationButtons = () => {
    if (current_slide == total_slides) {
        document.getElementById("next_button").style.display = "none";
        document.getElementById("submit_buttom").style.display = "block";
    }else{
        document.getElementById("next_button").style.display = "block";
        document.getElementById("submit_buttom").style.display = "none";
    }

    //Display Back Button
    if (current_slide >= 2) {
        document.getElementById('back_button').style.display = 'block';
    } else {
        document.getElementById('back_button').style.display = 'none';
    }
 }

 /**
  * Get value from input fields
  */
 function getValueFromInput(config){
   let val = '';
    switch(config.type) {
      case 'text':
      case 'dropdown':
        val =  $("#"+config.iValue).val();

        break;
      case 'radio':
        val = $("input[name="+config.iValue+"]:checked").val();
        break;
    }

    if(val == undefined){
      val = '';
    }

    return val;
 }


 /**
  * validate input field at each step
  * triggered on clicking next button
  */
 function validateInputAndConstructPayload(){
   const currRule = questionValidation[current_slide];
   let validationStatus = {validated: true};
   if(currRule){
     
      currRule.inputs.every(item => {
        
          let currVal = getValueFromInput({type: item.type, identifier: item.identifier, iValue: item.iValue});

          if(item.required && currVal == ''){
            validationStatus.validated = false;
            validationStatus.message = 'Input can\'t be empty';
            return false;//break loop
          }

          if(item.dataType == 'int' && isNaN(currVal)){
            validationStatus.validated = false;
            validationStatus.message = 'Input should be number';
            return false;//break loop
          }

          //validation passed -> Add to payload
          payload[item.iValue] = currVal;
          return true;//continue loop
      });
   }

   return validationStatus;
 }

/**
 * Navigate through the calculator pages using 'Next', 'Back' Buttons
 * @author Rashid
 */

function next() {
    //validate Input
    let validationStatus = validateInputAndConstructPayload();

    if(!validationStatus.validated){
      alert(validationStatus.message);
      return;
    }

    //increament current slide value
    current_slide++;

    //Hide all slides
    for (let i =  1; i <= total_slides; i++) {
        document.getElementById("slide_" + i).style.display = "none";
    }

    //display current slide
    document.getElementById("slide_" + current_slide).style.display = "block";

    //Handle progress bar
    updateProgressBar();

    //Show/Hide navigation buttons
    handleNavigationButtons();
   
}

function back() {
    current_slide -= 2;
    next();
}



/**
 * options Higlighter
 * @description Highlight the option user selects
 * @author Rashid
 */
function option_highlighter() {
    let form = document.querySelector("form");
    form.addEventListener("change", (evt) => {
        let trg = evt.target,
            trg_par = (trg.parentElement).parentElement;
            let prior = form.querySelector('div.div_checked input[name="' + trg.name + '"]');
            let isSelectable = !$(trg_par).hasClass('no-highlight');
            prior && prior.parentElement.parentElement.classList.remove("div_checked");
            isSelectable && trg_par.classList.add("div_checked");
    }, false);

    //add img src to "add Info" Icons
    $('.info-icon').attr('src', "/static/imgs/question.png")
}


  

  
/**
 * Modify payload and make axios call for payload submission and retrieval
 * @returns {Promise} api response
 * @author Rashid
 */
  const submitData = () => {
    //params = { spPlan: 'California Single Payer (SB 562, 2018)', hpPremium: '3600', timeframe: 'Per Year', epc: '7500', epcTimeFrame: 'year', typeOfWork: '', oop: '750', oopLongTerm: '0', householdSize: '2', householdIncome: '125000', deductible: '2000', shareOfCostHospital: '10', shareOfCostHospitalType: '%', annualOop: '7000' };
    
    
    //params = {  timeframe: 'Per Year', shareOfCostHospitalType: '%' };
    //payload.epc = '7500';
    //payload.typeOfWork = '';

    params = payload;

      return new Promise((resolve, reject) => {
        fetchData(params).then((res) => {
          resolve(res.data.values)
        }, (err) => {
          reject(err);
        })
      })
  }

 function syncConciseOuputAndPrint() {
    compactInputs = [
        {
          name: 'Single payer plan',
          printId: 'ci_1',
          isVisible: true,
          value: payload.spPlan,
          unit: '-',
        },
        {
          name: 'Your premium',
          printId: 'ci_2',
          isVisible: true,
          value: '$' + (payload.hpPremium * 1).toLocaleString(),
          unit: payload.timeframe,
        },
        {
          name: 'Employer premium',
          printId: 'ci_3',
          isVisible: !payload.epc === 'NA',
          value: '$' + (payload.epc * 1).toLocaleString(),
          unit: payload.epcTimeFrame,
        },
        {
          name: 'Part of a union',
          printId: 'ci_4',
          isVisible: payload.epc === 'NA',
          value: payload.typeOfWork,
          unit: '-',
        },
        {
          name: 'OOP spending',
          printId: 'ci_5',
          isVisible: true,
          value: '$' + (payload.oop * 1).toLocaleString(),
          unit: 'per year',
        },
        {
          name: 'OOP long-term care',
          printId: 'ci_6',
          isVisible: true,
          value: '$' + (payload.oopLongTerm * 1).toLocaleString(),
          unit: 'per year',
        },
        {
          name: 'Household size',
          printId: 'ci_7',
          isVisible: true,
          value: payload.householdSize,
          unit: '-',
        },
        {
          name: 'Household income',
          printId: 'ci_8',
          isVisible: true,
          value: '$' + (payload.householdIncome * 1).toLocaleString(),
          unit: 'per year',
        },
        {
          name: 'Deductible',
          printId: 'ci_9',
          isVisible: true,
          value: '$' + (payload.deductible * 1).toLocaleString(),
          unit: '-',
        },
        {
          name: 'Share of cost hospital',
          printId: 'ci_10',
          isVisible: true,
          value: '$' + (payload.shareOfCostHospital * 1).toLocaleString(),
          unit: payload.shareOfCostHospitalType,
        },
        {
          name: 'OOP cap',
          printId: 'ci_11',
          isVisible: true,
          value: '$' + (payload.annualOop * 1).toLocaleString(),
          unit: 'per year',
        }
      ]

      //contruct output table
     let table = compactInputs.map(item => {
        if(item.isVisible){
           return '<tr><td>'+ item.name +'</td><td>'+item.value +'</td><td>'+item.unit+'</td></tr>'
        }
      });

      //print table
      $('#ci_table_body').html(table);
  }


  /**
   * Popuplate all result contianers
   * @description map api response with resultMapping variable
   * @author Rasihd
   */

  function printResults(data){
    console.log('data', data)
      // data.forEach( (item, index) => {
      //   var mappedData = resultMapping[index];
      //   var elem = mappedData && $('#' + resultMapping[index].uid) || null;
      //   elem && $('#' + resultMapping[index].uid).html('$' + ((item*1).toFixed(0) * 1).toLocaleString());
      // });

      resultMapping.forEach(element => {
        var elem = $('#' + element.uid) || null;
        var result = data[element.rIndex];
        elem && result && elem.html('$' + ((result*1).toFixed(0) * 1).toLocaleString());
      });
   }

/**
 * Handle Data Submision
 * Triggered on form submit click with id="submit_buttom"
 */  
  function handleSubmission() {

    //display loader
    $('#loader-fallback').show();

    //submit data
    submitData().then((data) => {

      /**
       * response data
        0: How much you pay now	$11,850
        1: How much you'd pay with SP	$8,269
        2: Current OOP spending no LTC	$750
        3: Current OOP with LTC	$750
        4: Premium paid by employer	$7,500
        5: Premium paid by family	$3,600
        6: Savings	$3,581
        7: OOP with medical crisis	$4,000
        8: Savings with medical crisis	$6,831

        You pay now = OOP with LTC + PP emp + PP family //In case of medical crisi consider OOP with medical crisis
        11,850 = 750 + 7500 + 3600

        Saving = Pay now - SP
        3581 = 11850 - 8269
       */


      //disable loader
      $('#loader-fallback').hide();

      //hide questions section
     $('.calc-holder').hide();
     
     //show results section
     $('.results-holder').show();

      //print results
      printResults(data);

      //construct graph
      generateGraphs(data);

      syncConciseOuputAndPrint();
       
    }).catch((err) => {
      //disable loader
      $('#loader-fallback').hide();

      console.log('Something went wrong! Please try again.')
    });

  }

  /**
   * Generate Graph OBJ
   * @param {object} data Graph data
   * @author Rashid
   */

   function getGraphObj(data){
      return new Chart(data.bindVar, {
				type: 'bar',
				data: {
          labels: ['Current Insurance', 'Single Payer'],
          datasets: [{
              label: 'New Taxes',
              data: data.datasets[0],
              backgroundColor: ['rgba(43, 223, 75, 0.4)', 'rgba(43, 223, 75, 0.4)'],
              borderColor: ['rgba(43, 223, 75, 1)'],
              borderWidth: 1
          }, 
          {
            label: 'Premium spent by family',
            data: data.datasets[3],
            backgroundColor: ['rgba(54, 162, 235, 0.4)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
          },
          {
            label: 'Premium spent by employer',
            data: data.datasets[2],
            backgroundColor: ['rgba(255, 206, 86, 0.4)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 1
          },
          {
            label: 'Out-of-pocket Spending',
            data: data.datasets[1],
            backgroundColor: ['rgba(220, 53, 69, 0.4)'],
            borderColor: ['rgba(220, 53, 69, 1)'],
            borderWidth: 1
          }]
        },
				options: {
					title: {
						display: true,
						text: data.title
          },
          legend: {
            reverse: true,
        },
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
              stacked: true,
              barThickness: 40,
              ticks: {
                beginAtZero: true,
                userCallback: function(value, index, values) {
                    return value.toLocaleString();   // this is all we need
                }
              }
						}],
						yAxes: [{
              stacked: true,
              barThickness: 40,
              ticks: {
                beginAtZero: true,
                userCallback: function(value, index, values) {
                    return '$' + value.toLocaleString();   // this is all we need
                }
              }
						}]
					}
				}
			});
   }
 

  /**
   * Handle Graph generation
   * @param {array} data 
   * @author Rashid
   */
  function generateGraphs(data){
    //genarte graphs
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    var myChart1 = getGraphObj({bindVar: ctx1, title:'Your spending last year vs. with Single Payer (No Medical Crisis)', datasets: [[0, data[1][0]], [data[3][0], 0], [data[4][0], 0], [data[5][0], 0]]})
    var myChart2 = getGraphObj({bindVar: ctx2, title: 'Your spending with a medical crisis: Current Insurance vs. Single Payer', datasets: [[0, data[1][0]], [data[7][0], 0], [data[4][0], 0], [data[5][0], 0]]})
  }
 //window.myBar.update(); - to update chart




		window.onload = function() {
      option_highlighter();
       //handleSubmission();

    //    //hide questions section
    //  $('.calc-holder').hide();
     
    //  //show results section
    //  $('.results-holder').show();
    };




    //if we need to show modal on hover
     // $('#exampleModalCenter').modal('show')


    

/**
 * Inject text dynamically to the add info modal
 * Automatically triggered after modal is shown
 * @author Rashid
 */
    $('#addInfoModal').on('show.bs.modal', function (event) {
      let button = $(event.relatedTarget) // Button that triggered the modal
      let slide = button.data('slide') // Extract info from data-* attributes
      let modal = $(this);
      let text = addInfoText[slide];
      modal.find('.modal-body').html(text)
    })


    /***
     * Hide employee contributuon input and display workType dropdown
     * @author Rashid
     */
    function handleEpcHide(){
      //handle form
      $('#epcInputHolder').hide();
      $('#epcDropHolder').show();
      $('#epc').val('NA');
    }
   

    function displayResultPanel(panelId){
        $('.result-panel').hide();
        $("#" + panelId).show();
    }

   function handleRecalculation(){

    current_slide = 2;

    $('#result_1').show();
    $('#result_2').hide();
    //hide results section
    $('.results-holder').hide();
    

    //show questions section
    $('.calc-holder').show();
     
    back()
      
   }
  