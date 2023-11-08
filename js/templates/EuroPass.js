$(document).ready( function() {
/*$('.workArea > div').on('change', function() {
	alert(2*2);
	
	var siblings = $('.workArea > div').find('#mothertongue').filter(':visible');
	
	if ( siblings.size() == 0 ) {
		$('#forSkills').hide();
	} else {
		$('#forSkills').show()
	}
});*/


/* ResizeSENSOR Activation*/
	
	defaulPermission = "yes";
	pageBuilder(defaulPermission);
	var sensor = new ResizeSensor($('#myResume'), function() {
		pageBuilder(defaulPermission);
	});
	
	$('#fontChange button').click( function(){
		pageBuilder(defaulPermission);
	});
	
	
	
/* SELECT ELEMENTS */
		//make elements selectable
		function clickMe() {
			/*activateClickSelection("main", "no");
			activateClickSelection("aside", "no");
			activateClickSelectionForSections(".mainWrapper div", "yes");
			activateClickSelectionForSections(".mainWrapper td", "yes");
			activateClickSelectionForSections(".mainWrapper li", "yes");*/
			activateClick('.workArea *:not(.mainWrapper, section)', 'yes');
		};
		
		//sortable
		$('#sortableActivate-btn').click( function() {
			var buttonState = $('#sortableActivate-btn').text();
			if (buttonState === 'enable' ) {
				//change button text
				$('#sortableActivate-btn').text('disable');
				//turn select function off
				$('.workArea *').removeClass('personalizeMe').off('click');
				
				//remove pagination
				pageReset();
				sensor.detach();
				$('#myResume').perfectScrollbar();
				
				//wrap elements
				$('.myLearning, #forLearning').wrapAll('<div class="myLearningWrapper" />');
				//$('.myLearningWrapper').insertAfter('#forLearning');
				$('.myExperience, #forWork').wrapAll('<div class="myExperienceWrapper" />');
				//$('.myExperienceWrapper').insertAfter('#forWork');
				//make sortable
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper').sortable().css( 'cursor', 'pointer' );
			} else if (buttonState === 'disable' ) {
				//change button text
				$('#sortableActivate-btn').text('enable');
				//unwrap elements
				$('.myLearning').unwrap();
				$('.myExperience').unwrap();
				$('#myResume').scrollTop(0);
				//back to pagination
				$('#myResume').perfectScrollbar('destroy');
				new ResizeSensor($('#myResume'), function() {
					pageBuilder(defaulPermission);
				});

				//make elements selectable
				clickMe();
				//destroy sotable
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper, .mainWrapper').sortable('destroy').css( 'cursor', 'text' );
			}
		});
		
/* FORMS */

		$('#personalization').click(function() {
			//make elements selectable
			clickMe();		
		});

/* THE OBJECTS */
	
	// about me section
	function aboutMe(name, address, homephone, cellphone, email, website, im, gender, birth, nationality, jobposition) {
		this.myname = name;
		this.myaddress = address;		
		this.myhomephone = homephone;
		this.mymobile = cellphone;
		this.myemail = email;
		this.mysite = website;
		this.myim = im;
		this.mygender = gender;
		this.mybirth = birth;
		this.mynationality = nationality;
		this.myjobposition = jobposition;
		
		this.addAboutMe = function() {
			$('#personalInfo').show();
			$('#jobs').show();
			
			if ( this.myname === '' && this.myaddress === '' && this.myhomephone === '' && this.mymobile === '' && this.myemail === '' && this.mysite === ''&& this.myim === '' && this.mygender === ''&& this.mybirth === '' && this.mynationality === '' ) {
				$('#personalInfo').hide();
			}
			
			if ( this.myjobposition === '' ) {
				$('#jobs').hide();
			}
			
			$('aside').append(
				$('<div>'+ this.myname + '</div>').addClass('mynames formFilledOut')
			);
			
			$('#personalInfo h3').prepend(
				$('<span>'+ this.myname + '</span>').addClass('formFilledOut')
			);
			
			$('#personalInfo ul.details').append(
				$('<li>' + this.myaddress + '</li>').addClass('myaddress formFilledOut'),
				$('<li>' + this.myhomephone + '</li>').addClass('myhomephone formFilledOut'),
				$('<li>' + this.mymobile + '</li>').addClass('mymobile formFilledOut'),
				$('<li>' + this.myemail + '</li>').addClass('myemail formFilledOut'),
				$('<li>' + this.mysite + '</li>').addClass('mysite formFilledOut'),
				$('<li>' + this.myim + '</li>').addClass('myIM formFilledOut')
			);
			
			$('#personalInfo ul.moredetails').append(
				$('<li>' + this.mygender + '</li>').addClass('mygender formFilledOut'),
				$('<li>' + this.mybirth + '</li>').addClass('mybirth formFilledOut'),
				$('<li>' + this.mynationality + '</li>').addClass('mynationality formFilledOut')
			);
			
			$('#jobs').append(
				$('<div>'+ this.myjobposition + '</div>').addClass('formFilledOut')
			);
			
			var arr = $('.details li');
			for (j=0; j<arr.length; j++) {
				if ( $(arr[j]).html() === '' ) {
					$(arr[j]).remove();
				}
			}
			
			var arr2 = $('.moredetails li');
			for (k=0; k<arr2.length; k++) {
				if ( $(arr2[k]).html() === '' ) {
					$(arr2[k]).remove();
				}
			}
		}
	}
	
	// education section
	function myLearning(degree, datesEdu, institution, description) {
		this.degree = degree;
		this.datesEdu = datesEdu;
		this.institution = institution;
		this.description = description;
		
		this.addMyLearning = function() {
			$('#forLearning').show();
			
			if(degree === '' && datesEdu === '' && institution === '' && description === '') {
				$('#forLearning').hide();
				return;
			}
			
			var div1 = $('<div></div>').append( $('<div>' + this.datesEdu + '</div>').addClass('datesWork') );
			var div2 = $('<div></div>').append( 
				$('<div>'+ this.degree + '</div>').addClass('occupation'),
				$('<div>' + this.institution + '</div>').addClass('employer'),
				$('<div>' + this.description + '</div>').addClass('description')				
			);
			
			var lrnExp = $('<section></section>').addClass('myLearning formFilledOut').append( div1, div2 );
			
			if ( $('.mainWrapper').find('.myLearning') === false ) {
				$(lrnExp).insertAfter('#forLearning');
			} else {
				$(lrnExp).insertAfter( $('.myLearning').last() );
			}
		}
	}
	
	// work experience section
	function myExperience(occupation, datesWork, employer, description) {
		this.occupation = occupation;
		this.datesWork = datesWork;
		this.employer = employer;
		this.description = description;
		
		this.addMyExperience = function() {
			$('#forWork').show();
			
			if(occupation === '' && datesWork === '' && employer === '' && description === '') {
				$('#forWork').hide();
				return;
			}
			
			var div1 = $('<div></div>').append( $('<div>' + this.datesWork + '</div>').addClass('datesWork') );
			var div2 = $('<div></div>').append( 
				$('<div>'+ this.occupation + '</div>').addClass('occupation'),
				$('<div>' + this.employer + '</div>').addClass('employer'),
				$('<div>' + this.description + '</div>').addClass('description')				
			);
			
			var wrkExp = $('<section></section>').addClass('myExperience formFilledOut').append( div1, div2 );
			
			if ( $('.mainWrapper').find('.myExperience') === false ) {
				wrkExp.insertAfter('#forWork');
			} else {
				$(wrkExp).insertAfter( $('.myExperience').last() );
			}
		}
	}

	// mother tongue section
	function myMotherTongue(motherTongue) {
		this.motherTongue = motherTongue;
		
		this.addMyMotherTongue = function() {
			$('#mothertongue').show();
			if (motherTongue !== '' ) {
				$('#mothertongue').append(
						$('<div>' + motherTongue + '</div>').addClass('formFilledOut')
				);
			} else {
				$('#mothertongue').hide();
			}
		}
	}
	
	//other languages section
	function myLangSkills(languageName, certificateName, levelListening, levelReading, levelInteraction, levelProduction, levelWriting) {
		this.languageName = languageName;
		this.certificateName = certificateName;
		this.levelListening = levelListening;
		this.levelReading = levelReading;
		this.levelInteraction = levelInteraction;
		this.levelProduction = levelProduction;
		this.levelWriting = levelWriting;

		this.addMyLangSkill = function() {
			$('#otherlanguages').show();
			
			if(languageName === '' && certificateName === '' && levelListening === undefined && levelReading === undefined && levelInteraction === undefined && levelProduction === undefined && levelWriting === undefined) {
				$('#otherlanguages').hide();
				return;
			}
			
			var row1 = $('<tr></tr>').addClass('langname formFilledOut').append( 
				$('<td colspan="5">' + this.languageName + '</td>')
			);
			var row2 = $('<tr></tr>').addClass('langskill formFilledOut').append( 
				$('<td>' + this.levelListening + '</td>'),
				$('<td>' + this.levelReading + '</td>'),
				$('<td>' + this.levelInteraction + '</td>'),
				$('<td>' + this.levelProduction + '</td>'),
				$('<td>' + this.levelWriting + '</td>')
			);
			var row3 = $('<tr></tr>').addClass('langcert formFilledOut').append( 
				$('<td colspan="5">' + this.certificateName + '</td>')
			);
			
			$('#otherlanguages table').append(row1, row2, row3);
		}
	}
	
	// comm skills section
	function myCommSkills(comSkillName) {
		this.comSkillName = comSkillName;

		this.addCommSkills = function() {
			$('#commskills').show();
			if (comSkillName !== '' ) {
				$('#commskills ul').append(
						$('<li>' + comSkillName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#commskills').hide();
			}
		}
	}	
	
	// org skills section
	function myOrgSkills(orgSkillName) {
		this.orgSkillName = orgSkillName;
		
		this.addOrgSkills = function() {
			$('#orgskills').show();
			if (orgSkillName !== '' ) {
				$('#orgskills ul').append(
						$('<li>' + orgSkillName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#orgskills').hide();
			}
		}
	}

	// job-related skills section
	function myJobRSkills(jobRSkillName) {
		this.jobRSkillName = jobRSkillName;
		
		this.addJobRSkills = function() {
			$('#jobskills').show();
			if (jobRSkillName !== '' ) {
				$('#jobskills ul').append(
						$('<li>' + jobRSkillName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#jobskills').hide();
			}
		}
	}
		
	// comp skills table section
	function myCompSkillsTable(infprocessing, communicationpr, contCreation, safety, probSolving, certificate) {
		this.infprocessing = infprocessing;
		this.communicationpr = communicationpr;
		this.contCreation = contCreation;
		this.safety = safety;
		this.probSolving = probSolving;
		this.certificate = certificate;
		
		this.addMyCompSkillTable = function() {
			$('#digitalskills, #digitalskills table, #digitalskills table + p').show();
			
			var propertyNames = Object.keys(this).filter(function (propertyName) {
				return propertyName.indexOf("compSkill") === 0;
			});
			
			for(var j=0; j<propertyNames.length; j++) {
				if (this[ propertyNames[j] ] === '') {
					continue;
				}
				
				var compskillset = $('<li>' + this[ propertyNames[j] ] + '</li>').addClass('formFilledOut');
				compskillset.appendTo('#digitalskills ul');
			}
			
			var list = $('#digitalskills li').filter(':visible').length;

			if(infprocessing === undefined && communicationpr === undefined && contCreation === undefined && safety === undefined && probSolving === undefined && certificate === '' && list === 0) {
				$('#digitalskills').hide();
				return;
			}
			
			if(infprocessing === undefined && communicationpr === undefined && contCreation === undefined && safety === undefined && probSolving === undefined && certificate === '') {
				$('#digitalskills table, #digitalskills table + p').hide();
				return;
			}
		
			var row1 = $('<tr></tr>').addClass('formFilledOut').append( 
				$('<td>' + this.infprocessing + '</td>'),
				$('<td>' + this.communicationpr + '</td>'),
				$('<td>' + this.contCreation + '</td>'),
				$('<td>' + this.safety + '</td>'),
				$('<td>' + this.probSolving + '</td>')
			);
			var row2 = $('<tr></tr>').addClass('compcert formFilledOut').append( 
				$('<td colspan="5">' + this.certificate + '</td>')
			);
			
			$('#digitalskills table').append(row1, row2);
		}
	}

	// driving skills section
	function myDrivingSkills(drivingSkillName) {
		this.drivingSkillName = drivingSkillName;
		
		this.addMyDrivingSkill = function() {
			$('#drivingskills').show();
			if (drivingSkillName !== '' ) {
				$('#drivingskills').append(
						$('<div>' + drivingSkillName + '</div>').addClass('formFilledOut')
				);
			} else {
				$('#drivingskills').hide();
			}
		}
	}
	
	// other skills section
	function myOtherSkills(otherSkillName) {
		this.otherSkillName = otherSkillName;
		
		this.addMyOtherSkill = function() {
			$('#otherskills').show();
			if (otherSkillName !== '' ) {
				$('#otherskills ul').append(
						$('<li>' + otherSkillName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#otherskills').hide();
			}
		}
	}
	
	// additional information section
	function myAddInfo(addInfoName) {
		this.addInfoName = addInfoName;
		
		this.addAddInfo = function() {
			$('#addiotionalInfo, #forAddInfo').show();
			if (addInfoName !== '' ) {
				$('#addiotionalInfo ul').append(
						$('<li>' + addInfoName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#addiotionalInfo, #forAddInfo').hide();
			}
		}
	}

	// annexes section
	function myAnnexes(addAnnexName) {
		this.addAnnexName = addAnnexName;
		
		this.addAnnex = function() {
			$('#annexes, #forAnnexes').show();
			if (addAnnexName !== '' ) {
				$('#annexes ul').append(
						$('<li>' + addAnnexName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#annexes, #forAnnexes').hide();
			}
		}
	}
	
/* BUTTONS */
	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//update template click
		$('#updateTemplate').on('click', function() {
				//check image
				if ( $('#personalInfo img').attr('src') === '../img/test.jpg' ) {
					$('#personalInfo img').hide();
				} else {
					$('#personalInfo img').show();
				}
				//hide defaultInfo
				$('.defaultInfo').hide();
				//remove existing
				$('.formFilledOut').remove();
				//add about me section
				var name = $('#aboutMeForm-1').val();
				var address = $('#aboutMeForm-2').val();
				var homephone = $('#aboutMeForm-3').val();
				var cellphone = $('#aboutMeForm-4').val();
				var email = $('#aboutMeForm-5').val();
				var website = $('#aboutMeForm-6').val();
				var im = $('#aboutMeForm-7').val();
				var gender = $('#aboutMeForm-8').val();
				var birth = $('#aboutMeForm-9').val();
				var nationality = $('#aboutMeForm-10').val();
				var jobposition = $('#aboutMeForm-11').val();
				var about = new aboutMe(name, address, homephone, cellphone, email, website, im, gender, birth, nationality, jobposition);
				about.addAboutMe();				
				//add learning section
				$('#myLearningForm div').each(function() {
					var degree = $(this).find('input:eq(0)').val();
					var datesEdu = $(this).find('input:eq(1)').val();
					var institution = $(this).find('input:eq(2)').val();
					var descriptionEdu = $(this).find('textarea').val();
					var education = new myLearning(degree, datesEdu, institution, descriptionEdu);
					education.addMyLearning();
				});
				//add work experience
				$('#myExperienceForm div').each(function() {
					var occupation = $(this).find('input:eq(0)').val();
					var datesWork = $(this).find('input:eq(1)').val();
					var employer = $(this).find('input:eq(2)').val();
					var descriptionWork = $(this).find('textarea').val();
					var workExperience = new myExperience(occupation, datesWork, employer, descriptionWork);
					workExperience.addMyExperience();
				});
				//add comm skills
				$('#myCommSkillsForm div').each(function() {
					var comSkillName = $(this).find('input').val();
					var toAddCommSkill = new myCommSkills(comSkillName);
					toAddCommSkill.addCommSkills();
				});
				//add org skills
				$('#myOrgSkillsForm div').each(function() {
					var orgSkillName = $(this).find('input').val();
					var toAddOrgSkill = new myOrgSkills(orgSkillName);
					toAddOrgSkill.addOrgSkills();
				});
				//add job-related skills
				$('#myJobSkillsForm div').each(function() {
					var jobRSkillName = $(this).find('input').val();
					var toAddJobRSkill = new myJobRSkills(jobRSkillName);
					toAddJobRSkill.addJobRSkills();
				});
				//add mother tongue
				var motherTongue = $('#myLanguagesForm-0').val();
				var toAddMotherTongue = new myMotherTongue(motherTongue);
				toAddMotherTongue.addMyMotherTongue();
				//add other languages
				$('#myLanguagesForm div').each(function() {
					var languageName = $(this).find('input.input__field:eq(0)').val();
					var certificateName = $(this).find('input.input__field:eq(1)').val();
					var levelListening = $(this).find('ul:eq(0) input:checked').val();
					var levelReading = $(this).find('ul:eq(1) input:checked').val();
					var levelInteraction = $(this).find('ul:eq(2) input:checked').val();
					var levelProduction = $(this).find('ul:eq(3) input:checked').val();
					var levelWriting = $(this).find('ul:eq(4) input:checked').val();

					var toAddLangSkill = new myLangSkills(languageName, certificateName, levelListening, levelReading, levelInteraction, levelProduction, levelWriting);
					toAddLangSkill.addMyLangSkill();
				});
				//add computer skills table
				var infprocessing = $('.infProcessing input:checked').val();
				var communicationpr = $('.Communication input:checked').val();
				var contCreation = $('.contCreation input:checked').val();
				var safety = $('.Safety input:checked').val();
				var probSolving = $('.probSolving input:checked').val();
				var certificate = $('#myDigitalCompForm-1').val();
				
				var toAddCompTable = new myCompSkillsTable(infprocessing, communicationpr, contCreation, safety, probSolving, certificate);	
					//comp skills
					var compSkills = $('#myDigitalCompForm div').get().reverse();
					var lengths = $('#myDigitalCompForm div').length;
					
					$(compSkills).each(function() {
						var compSkill = $(this).find('input').val();
						for(i=0;i<lengths; i++){
							toAddCompTable['compSkill' + i] = compSkill;
						}			
					});
				toAddCompTable.addMyCompSkillTable();
				//add driving skills
				var drivingSkillName = $('#myDrivingSkills-1').val();
				var toAddDrivingSkill = new myDrivingSkills(drivingSkillName);
				toAddDrivingSkill.addMyDrivingSkill();
				//add other skills
				$('#myOtherSkillsForm div').each(function() {
					var otherSkillName = $(this).find('input').val();
					var toAddOtherSkill = new myOtherSkills(otherSkillName);
					toAddOtherSkill.addMyOtherSkill();
				});
				//add additional information
				$('#myAddInfoForm div').each(function() {
					var addInfoName = $(this).find('input').val();
					var toAddAddInfo = new myAddInfo(addInfoName);
					toAddAddInfo.addAddInfo();
				});
				//add annexes
				$('#myAnnexesForm div').each(function() {
					var addAnnexName = $(this).find('input').val();
					var toAddAnnex = new myAnnexes(addAnnexName);
					toAddAnnex.addAnnex();
				});
				//Step 1 Fillout checked
				$('#fillOut span.checkMark').css({opacity: '1'});
				
				//hide/show personal skills
				var siblings = $('.workArea > div').find('#mothertongue, #otherlanguages, #commskills, #orgskills, #jobskills, #digitalskills, #otherskills, #drivingskills').filter(':visible');
				if ( siblings.size() == 0 ) {
					$('#forSkills').hide();
				} else {
					$('#forSkills').show()
				}
				
				//pageBuilder
				pageBuilder(defaulPermission);
		});
			
});





