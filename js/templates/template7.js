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
			activateClickSelection(".firstName", "yes");
			activateClickSelection(".lastName", "yes");
			activateClickSelection("#aboutMe", "yes");
			activateClickSelection(".workArea h2", "yes");
			activateClickSelection(".workArea .sentOne", "yes");
			activateClickSelectionForSections(".mainWrapper div", "yes");
			activateClickSelectionForSections(".workArea li", "yes");*/
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
				$('#myOthers, #forOthers').wrapAll('<div class="myExperienceWrapper" />');
				$('#mySkills, #forSkills').wrapAll('<div class="myExperienceWrapper" />');
				//make sortable
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper').sortable({cancel: 'h2', opacity: 0.8}).css( 'cursor', 'pointer' );
				$('.mainWrapper').sortable({handle: 'h2'}).css( 'cursor', 'pointer' );
			} else if (buttonState === 'disable' ) {
				//change button text
				$('#sortableActivate-btn').text('enable');
				//unwrap elements
				$('.myLearning').unwrap();
				$('.myExperience').unwrap();
				$('#myOthers').unwrap();
				$('#mySkills').unwrap();
				
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
	
	// aside section/contact details
	function contactDetails(firstName, lastName, contactInfo1, contactInfo2, contactInfo3) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactInfo1 = contactInfo1;
		this.contactInfo2 = contactInfo2;
		this.contactInfo3 = contactInfo3;
		
		this.addContactInfo = function() {
			$('.nameSection h1').prepend(
				$('<span>'+ this.firstName + '</span>').addClass('firstName formFilledOut')
			);
			$('.nameSection h1').append(
				$('<span>' + this.lastName + '</span>').addClass('lastName formFilledOut')
			);
			$('.contactInfo ul').append(
				$('<li>' + this.contactInfo1 + '</li>').addClass('formFilledOut'),
				$('<li>' + this.contactInfo2 + '</li>').addClass('formFilledOut'),
				$('<li>' + this.contactInfo3 + '</li>').addClass('formFilledOut')
			);
		}
	}
	
	// about me section
	function aboutMe(header, message) {
		this.header = header;
		this.message = message;
		
		this.addAboutMe = function() {
			$('#aboutMe').append(
				$('<p><span class="sentOne">' + this.header + '</span> ' + this.message + '</p>').addClass('formFilledOut')
			);
		}
	}
	
	// education section
	function myLearning(degree, datesEdu, institution, description) {
		this.degree = degree;
		this.datesEdu = datesEdu;
		this.institution = institution;
		this.description = description;
		
		this.addMyLearning = function() {
			$('#forLearning').show()
			if (degree === '' && datesEdu === '' && institution === '' && description === '') {
				$('#forLearning').hide()
				return;
			}
			
			var lrnExp = $('<section></section>').addClass('myLearning formFilledOut').append(
				$('<div>'+ this.degree + '</div>').addClass('degree'),
				$('<div>' + this.institution + '</div>').addClass('institution'),
				$('<div>' + this.datesEdu + '</div>').addClass('datesEdu'),
				$('<div>' + this.description + '</div>').addClass('description')
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
			$('#forWork').show()	
			if (occupation === '' && datesWork === '' && employer === '' && description === '') {
				$('#forWork').hide()	
				return;
			}
			
			var wrkExp = $('<section></section>').addClass('myExperience formFilledOut').append(
				$('<div>'+ this.occupation + '</div>').addClass('occupation'),
				$('<div>' + this.employer + '</div>').addClass('employer'),
				$('<div>' + this.datesWork + '</div>').addClass('datesWork'),
				$('<div>' + this.description + '</div>').addClass('description')
			);
			
			if ( $('.mainWrapper').find('.myExperience') === false ) {
				wrkExp.insertAfter('#forWork');
			} else {
				$(wrkExp).insertAfter( $('.myExperience').last() );
			}
		}
	}
	
	// skills section
	function mySkills(skillName) {
		this.skillName = skillName;
		
		this.addMySkill = function() {
			$('#forSkills, #mySkills').show()
			if (skillName !== '') {
				$('#mySkills ul').append(
					$('<li>' + skillName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#forSkills, #mySkills').hide()
			}
		}
	}
	
	// others section
	function myOthers(otherName) {
		this.otherName = otherName;
		
		this.addMyOther = function() {
			$('#forOthers, #myOthers').show()
			if (otherName !== '') {
				$('#myOthers ul').append(
						$('<li>' + otherName + '</li>').addClass('formFilledOut')
				);
			} else {
				$('#forOthers, #myOthers').hide()
			}
		}
	}
	
/* CHECK IF ASIDE NAME IS TOO LONG */
	
	//check number of characters in last name and change font
	$('#updateTemplate').on('click', function() {
		var titlesize = $('#contactDetailsForm-2').val().length;
		if (titlesize > 16) {
			$('.lastName, .firstName').css('font-size', '40pt');
		} else if (titlesize > 12) {
			$('.lastName, .firstName').css('font-size', '50pt');
		}
	});
	
/* BUTTONS */
	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//update template click
		$('#updateTemplate').on('click', function() {
				//hide defaultInfo
				$('.defaultInfo').css({display: 'none'});
				//remove existing
				$('.formFilledOut').remove();
				//add contact details
				var firstName = $('#contactDetailsForm-1').val();
				var lastName = $('#contactDetailsForm-2').val();
				var contactInfo1 = $('#contactDetailsForm-3').val();
				var contactInfo2 = $('#contactDetailsForm-4').val();
				var contactInfo3 = $('#contactDetailsForm-5').val();
				var contacts = new contactDetails(firstName, lastName, contactInfo1, contactInfo2, contactInfo3);
				contacts.addContactInfo();
				//add about me section
				var header = $('#aboutMeForm-1').val();
				var message = $('#aboutMeForm-2').val();
				var about = new aboutMe(header, message);
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
				//add skills
				$('#mySkillsForm div').each(function() {
					var skillName = $(this).find('input').val();
					var toAddSkill = new mySkills(skillName);
					toAddSkill.addMySkill();
				});
				//add others
				$('#myOthersForm div').each(function() {
					var otherName = $(this).find('input').val();
					var toAddOther = new myOthers(otherName);
					toAddOther.addMyOther();
				});
				//Step 1 Fillout checked
				$('#fillOut span.checkMark').css({opacity: '1'});
				pageBuilder(defaulPermission);
		});


});





