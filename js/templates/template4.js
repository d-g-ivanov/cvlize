$(document).ready( function() {
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
			/*activateClickSelection("aside", "no");
			activateClickSelection("main", "no");
			activateClickSelection("aside h2", "yes");
			activateClickSelection("aside h3", "yes");
			activateClickSelectionForSections("aside li", "yes");
			activateClickSelection(".mySkills", "yes");
			activateClickSelection(".firstName", "yes");
			activateClickSelection(".lastName", "yes");
			activateClickSelectionForSections("main .mainWrapper > section", "yes");
			activateClickSelectionForSections(".mainWrapper div", "yes");
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
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper').sortable({cancel: 'h2', opacity: 0.8}).css( 'cursor', 'pointer' );
				$('.mainWrapper').sortable({handle: 'h2'}).css( 'cursor', 'pointer' );
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
	function aboutMe(firstName, lastName, role) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		
		this.addAboutMe = function() {
			$('.nameSection h1').prepend(
				$('<span>'+ this.firstName + '</span>').addClass('firstName formFilledOut')
			);
			$('.nameSection h1').append(
				$('<span>' + this.lastName + '</span>').addClass('lastName formFilledOut')
			);
			$('.nameSection').append(
				$('<p>' + this.role + '</p>').addClass('formFilledOut')
			);
		}
	}
	
	// aside section/contact details
	function contactDetails(address, email, phone, site1, site2, site3) {
		this.address = address;
		this.email = email;
		this.phone = phone;
		this.site1 = site1;
		this.site2 = site2;
		this.site3 = site3;
		
		this.addContactInfo = function() {
			$('.myDetails').append(
				$('<li>' + this.address + '</li>').addClass('myaddress formFilledOut'),
				$('<li>'+ this.email + '</li>').addClass('myemail formFilledOut'),
				$('<li>' + this.phone + '</li>').addClass('myphone formFilledOut')
			);
			
			$('.mySites').show()
			$('.mySites').append(
				$('<li>' + this.site1 + '</li>').addClass('site1 formFilledOut'),
				$('<li>'+ this.site2 + '</li>').addClass('site2 formFilledOut'),
				$('<li>' + this.site3 + '</li>').addClass('site3 formFilledOut')
			);
			
			if (site1 === '' && site2 === '' && site3 === '') {
				$('.mySites, #mySites').hide();
			} else if (site1 === '') {
				$('.site1').remove();
			} else if (site2 === '') {
				$('.site2').remove();
			} else if (site3 === '') {
				$('.site3').remove();
			}
		}
	}
	
	// education section
	function myLearning(degree, datesEdu, institution) {
		this.degree = degree;
		this.datesEdu = datesEdu;
		this.institution = institution;
		//this.description = description;
		
		this.addMyLearning = function() {
			
			var lrnExp = $('<section></section>').addClass('myLearning formFilledOut').append(
				$('<div>' + this.datesEdu + '</div>').addClass('datesEdu'),
				$('<div>'+ this.degree + '</div>').addClass('degree'),
				$('<div>' + this.institution + '</div>').addClass('institution')
				//$('<div>' + this.description + '</div>').addClass('description')
			);
			
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
			var sec1 = $('<div></div>').append(
							$('<div>'+ this.occupation + '</div>').addClass('occupation'),
							$('<div>' + this.datesWork + '</div>').addClass('datesWork'),
							$('<div>' + this.employer + '</div>').addClass('employer cf')
						);		
			var sec2 = $('<div></div>').append(
							$('<div>' + this.description + '</div>').addClass('description cf')
						);		
			var wrkExp = $('<section></section>').addClass('myExperience formFilledOut').append(sec1, sec2);
			
			if ( $('.mainWrapper').find('.myExperience') === false ) {
				wrkExp.insertAfter('#forWork');
			} else {
				$(wrkExp).insertAfter( $('.myExperience').last() );
			}
		}
	}
	
	// skills section
	function mySkills(skHeader) {
		this.skHeader = skHeader;
		
		this.addMySkill = function() {
			var sectionCreate = $('<ul></ul>').append(
				$('<h3>' + skHeader + '</h3>').addClass('formFilledOut')
			);
			
			var propertyNames = Object.keys(this).filter(function (propertyName) {
				return propertyName.indexOf("skill") === 0;
			});

			for(var j=0; j<propertyNames.length; j++) {
				var skillset = $('<li>' + this[ propertyNames[j] ] + '</li>').addClass('formFilledOut');
				skillset.appendTo(sectionCreate);
			}
			
			sectionCreate.insertAfter( $('#mySkills h2:eq(0)') );
		}
	}
	
	// references section
	function myReference(referenceName) {
		this.referenceName = referenceName;
		
		this.addMyReference = function() {
			if (referenceName === '' ) {
				$('.referencesHeader, .myReferences').hide();
			} else {
				$('.referencesHeader, .myReferences').show();
				$('#mySkills ul.myReferences').append(
					$('<li>' + referenceName + '</li>').addClass('formFilledOut')
				);
			}
		}
	}
	
/* BUTTONS */
	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//update template click
		$('#updateTemplate').on('click', function() {
				//hide defaultInfo
				$('.defaultInfo').hide();
				//remove existing
				$('.formFilledOut').remove();
				//add about me section
				var firstName = $('#aboutMeForm-1').val();
				var lastName = $('#aboutMeForm-2').val();
				var role = $('#aboutMeForm-3').val();
				var about = new aboutMe(firstName, lastName, role);
				about.addAboutMe();
				//add contact details
				var myaddress = $('#contactDetailsForm-1').val();
				var myemail = $('#contactDetailsForm-2').val();
				var myphone = $('#contactDetailsForm-3').val();
				var site1 = $('#contactDetailsForm-4').val();
				var site2 = $('#contactDetailsForm-5').val();
				var site3 = $('#contactDetailsForm-6').val();
				var contacts = new contactDetails(myaddress, myemail, myphone, site1, site2, site3);
				contacts.addContactInfo();
				//add learning section
				$('#myLearningForm div').each(function() {
					var degree = $(this).find('input:eq(0)').val();
					var datesEdu = $(this).find('input:eq(1)').val();
					var institution = $(this).find('input:eq(2)').val();
					//var descriptionEdu = $(this).find('textarea').val();
					var education = new myLearning(degree, datesEdu, institution);
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
				//add reference
				$('#myReferencesForm div').each(function() {
					var referenceName = $(this).find('input').val();
					var toAddReference = new myReference(referenceName);
					toAddReference.addMyReference();
				});
				
				
				
				
				
				//add skills
				var skillSections = $('#mySkillsForm2 div').get().reverse();
				$(skillSections).each(function() {
					var skillTitle = $(this).find('input:eq(0)').val();
					var toAddSkill = new mySkills(skillTitle);
					
					var inputs = $(this).find('input');
					
					for(i=1;i<inputs.length; i++){
						toAddSkill['skill' + i] = $(inputs[i]).val();
					}

					toAddSkill.addMySkill();
					
				});
				//Step 1 Fillout checked
				$('#fillOut span.checkMark').css({opacity: '1'});
				
				//pageBuilder
				pageBuilder(defaulPermission);
		});


});





