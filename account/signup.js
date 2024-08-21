// this file contains mostly AWS cognito template code

function getAdvancedSecurityData(formReference) {
	if (typeof AmazonCognitoAdvancedSecurityData === 'undefined') {
		return true;
	}
	var userPoolId = '';
	var clientId = getUrlParameter('client_id');
	var username = '';
	var usernameInput = document.getElementsByName('username')[0];
	if (usernameInput && usernameInput.value) {
		username = usernameInput.value;
	}
	var asfData = AmazonCognitoAdvancedSecurityData.getData(username, userPoolId, clientId);
	if (typeof asfData === 'undefined') {
		return true;
	}
	if (formReference && formReference.cognitoAsfData) {
		formReference.cognitoAsfData.value = asfData;
	}
	return true;
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function onSubmit(evt, formRef) {
	formRef.querySelector('#signup').disabled = true;
	if (!!formRef.submitted) {
		evt.preventDefault();
		return false;
	} else {
		formRef.submitted = true;
		return getAdvancedSecurityData(formRef);
	}
}

// students do not have account with AWS Cognito
// their account is stored in a classroom JSON file in an S3 bucket
async function onStudentSubmit(evt) {
	evt.preventDefault();

	const f = Object.fromEntries(new FormData(evt.target).entries());

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod/p5play-public';
	let birthYear = new Date().getFullYear() - $('#age').val();
	let reqParams = `?req=studentSignUp&classID=${f.classID}&studentID=${f.studentID}&birthYear=${birthYear}`;
	let res = await fetch(apiUrl + reqParams, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status != 200) {
		let msg = await res.text();
		return alert(msg);
	}

	let usr = await res.json();
	usr.classID = f.classID;
	usr.studentID = f.studentID;
	usr.type = 'Student';
	usr.exp = Math.round(Date.now() / 1000) + 2600000;
	localStorage.setItem('p5playAccount', JSON.stringify(usr));

	open('index.html', '_self');
}

var $inputs = $(':input');
$inputs.on('input', function () {
	var self = this;
	var matches = $('input[name="' + this.name + '"]');
	var selfIndex = matches.index($(self));
	matches.each(function (index, element) {
		if (selfIndex !== index) {
			$(element).val($(self).val());
		}
	});
});

document.getElementById('localeInput').value = navigator.languages[0] || navigator.language || navigator.userLanguage;

document.getElementById('todaysDate').value = Math.floor(new Date().getTime() / 1000);

function checkPasswordHelper(password) {
	var passwordPolicy = [];
	passwordPolicy.lowercase = 'Password must contain a lower case letter';
	passwordPolicy.uppercase = 'Password must contain an upper case letter';
	passwordPolicy.number = 'Password must contain a number';
	passwordPolicy.special = 'Password must contain a special character or a space';
	passwordPolicy.validSpaces = 'Password must not contain a leading or trailing space';
	var passwordLength = 8;
	passwordPolicy.lengthCheck = 'Password must contain at least 8 characters';
	var requireLowerletter = false;
	var requireUpperletter = false;
	var requireNumber = false;
	var requireSymbol = false;
	var requireLength = false;
	var requireNoLeadingOrTrailingSpaces = false;
	if (password || password === '') {
		if (true) {
			if (/[a-z]/.test(password)) {
				$('.check-lowerletter').html('&#10003;');
				$('.checkPasswordText-lowerletter').html(passwordPolicy.lowercase);
				$('.checkPassword-lowerletter')
					.addClass('passwordCheck-valid-customizable')
					.removeClass('passwordCheck-notValid-customizable');
				requireLowerletter = true;
			} else {
				$('.check-lowerletter').html('&#10006;');
				$('.checkPasswordText-lowerletter').html(passwordPolicy.lowercase);
				$('.checkPassword-lowerletter')
					.addClass('passwordCheck-notValid-customizable')
					.removeClass('passwordCheck-valid-customizable');
				requireLowerletter = false;
			}
		} else {
			requireLowerletter = true;
		}
		if (true) {
			if (/[A-Z]/.test(password)) {
				$('.check-upperletter').html('&#10003;');
				$('.checkPasswordText-upperletter').html(passwordPolicy.uppercase);
				$('.checkPassword-upperletter')
					.addClass('passwordCheck-valid-customizable')
					.removeClass('passwordCheck-notValid-customizable');
				requireUpperletter = true;
			} else {
				$('.check-upperletter').html('&#10006;');
				$('.checkPasswordText-upperletter').html(passwordPolicy.uppercase);
				$('.checkPassword-upperletter')
					.addClass('passwordCheck-notValid-customizable')
					.removeClass('passwordCheck-valid-customizable');
				requireUpperletter = false;
			}
		} else {
			requireUpperletter = true;
		}
		if (true) {
			if (/[-+=!$%^&*()_|~`{}\[\]:\/;<>?,.@#'"\s]/.test(password.trim()) || password.indexOf('\\') >= 0) {
				$('.check-symbols').html('&#10003;');
				$('.checkPasswordText-symbols').html(passwordPolicy.special);
				$('.checkPassword-symbols')
					.addClass('passwordCheck-valid-customizable')
					.removeClass('passwordCheck-notValid-customizable');
				requireSymbol = true;
			} else {
				$('.check-symbols').html('&#10006;');
				$('.checkPasswordText-symbols').html(passwordPolicy.special);
				$('.checkPassword-symbols')
					.addClass('passwordCheck-notValid-customizable')
					.removeClass('passwordCheck-valid-customizable');
				requireSymbol = false;
			}
		} else {
			requireSymbol = true;
		}
		if (true) {
			if (/[0-9]/.test(password)) {
				$('.check-numbers').html('&#10003;');
				$('.checkPasswordText-numbers').html(passwordPolicy.number);
				$('.checkPassword-numbers')
					.addClass('passwordCheck-valid-customizable')
					.removeClass('passwordCheck-notValid-customizable');
				requireNumber = true;
			} else {
				$('.check-numbers').html('&#10006;');
				$('.checkPasswordText-numbers').html(passwordPolicy.number);
				$('.checkPassword-numbers')
					.addClass('passwordCheck-notValid-customizable')
					.removeClass('passwordCheck-valid-customizable');
				requireNumber = false;
			}
		} else {
			requireNumber = true;
		}
		if (password.length < passwordLength) {
			$('.check-length').html('&#10006;');
			$('.checkPasswordText-length').html(passwordPolicy.lengthCheck);
			$('.checkPassword-length')
				.addClass('passwordCheck-notValid-customizable')
				.removeClass('passwordCheck-valid-customizable');
			requireLength = false;
		} else {
			$('.check-length').html('&#10003;');
			$('.checkPasswordText-length').html(passwordPolicy.lengthCheck);
			$('.checkPassword-length')
				.addClass('passwordCheck-valid-customizable')
				.removeClass('passwordCheck-notValid-customizable');
			requireLength = true;
		}
		if (/^\s+|\s+$/.test(password)) {
			$('.check-valid-spaces').html('&#10006;');
			$('.checkPasswordText-valid-spaces').html(passwordPolicy.validSpaces);
			$('.checkPassword-valid-spaces')
				.addClass('passwordCheck-notValid-customizable')
				.removeClass('passwordCheck-valid-customizable');
			requireNoLeadingOrTrailingSpaces = false;
		} else {
			$('.check-valid-spaces').html('&#10003;');
			$('.checkPasswordText-valid-spaces').html(passwordPolicy.validSpaces);
			$('.checkPassword-valid-spaces')
				.addClass('passwordCheck-valid-customizable')
				.removeClass('passwordCheck-notValid-customizable');
			requireNoLeadingOrTrailingSpaces = true;
		}
	}
	return (
		requireLowerletter &&
		requireUpperletter &&
		requireNumber &&
		requireLength &&
		requireSymbol &&
		requireNoLeadingOrTrailingSpaces
	);
}
function checkConfirmForgotPasswordMatch() {
	checkResetPasswordMatch();
}
function checkConfirmPasswordMatches(password, confirmPassword) {
	if (password === confirmPassword) {
		$('.check-matches').html('&#10003;');
		$('.checkPasswordText-matches').html('Passwords must match');
		$('.checkPassword-matches')
			.addClass('passwordCheck-valid-customizable')
			.removeClass('passwordCheck-notValid-customizable');
		return true;
	}
	$('.check-matches').html('&#10006;');
	$('.checkPasswordText-matches').html('Passwords must match');
	$('.checkPassword-matches')
		.addClass('passwordCheck-notValid-customizable')
		.removeClass('passwordCheck-valid-customizable');
	return false;
}
function checkResetPasswordMatch() {
	var password = $('#new_password').val();
	var confirmPassword = $('#confirm_password').val();
	var doesConfirmPasswordMatch = checkConfirmPasswordMatches(password, confirmPassword);
	$('button[name="reset_password"]').prop('disabled', !(checkPasswordHelper(password) && doesConfirmPasswordMatch));
}

document.getElementById('');

function validate(selector) {
	let el = $(selector);
	el.removeClass('not-valid');
	el.addClass('is-valid');
}

function invalidate(selector) {
	let el = $(selector);
	el.removeClass('is-valid');
	el.addClass('not-valid');
}

function checkIfValid() {
	// Check if the account_type input is valid
	let accountType = $('#account_type').val();

	if (accountType != '') validate('#account_type');
	else invalidate('#account_type');

	let ageIsValid = false;
	let age = Number($('#age').val());
	if ($('#age').val() && age > 6 && age < 100) {
		if (age < 13 && accountType == 'Developer') {
			alert('You must be at least 13 years old to sign up for a Developer account.');
			$('#account_type').val('Student');
		} else if (age < 18 && accountType == 'Teacher') {
			alert('You must be at least 18 years old to sign up for a Teacher account.');
			$('#account_type').val('Student');
		}
		accountType = $('#account_type').val();

		if (accountType == 'Student') {
			$('.student').show();
			$('.personal').hide();
			$('#signup').hide();
			$('#signin').hide();
		} else {
			$('.student').hide();
			$('.personal').css('display', 'flex');
			$('#signup').show();
			$('#signin').show();
		}

		ageIsValid = true;

		let currentYear = new Date().getFullYear();
		let birthYear = Math.round(currentYear - age);
		$('#birthday').val(birthYear + '-01-01');
	}

	if (ageIsValid) {
		validate('#age');
	} else {
		invalidate('#age');
	}

	if (accountType == 'Student') {
		let enableSignUp = true;
		if ($('#class_id').val().length == 5) {
			validate('#class_id');
		} else {
			invalidate('#class_id');
			enableSignUp = false;
		}
		if ($('#student_id').val().length > 1) {
			validate('#student_id');
		} else {
			invalidate('#student_id');
			enableSignUp = false;
		}
		$('#studentSignUp').prop('disabled', !enableSignUp);
		return;
	}

	if ($('#full-name').val().length > 0) {
		validate('#full-name');
	} else {
		invalidate('#full-name');
	}

	if ($('#gender').val().length > 0) {
		validate('#gender');
	} else {
		invalidate('#gender');
	}

	if ($('#school').val().length > 0) {
		validate('#school');
	} else {
		invalidate('#school');
	}

	if ($('#country').val().length > 0) {
		validate('#country');
		document.getElementById('localeInput').value += ' ' + $('#country').val();
	} else {
		invalidate('#country');
	}

	let hasValidEmail = false;
	if (isValidEmail($('#email').val())) {
		validate('#email');
		hasValidEmail = true;
	} else {
		invalidate('#email');
	}

	let hasValidPassword = true;
	let password = $('#password').val();
	if (isValidPassword(password)) {
		validate('#password');
		$('#checkPassword').hide();
	} else {
		invalidate('#password');
		if (password) {
			$('#checkPassword').show();
			checkPasswordHelper(password);
		}
	}

	let canSubmit = hasValidEmail && hasValidPassword;
	$('#signup').prop('disabled', !canSubmit);
}
function isValidPassword(password) {
	var regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ -+=!$%^&*()_|~`{}\[\]:\/;<>?,.@#'"\s])[A-Za-z\d-+=!$%^&*()_|~`{}\[\]:\/;<>?,.@#'"]{8,}$/;
	return regex.test(password);
	/*
			This makes sure that the password has:
			- At least one lowercase letter (a-z).
			- At least one uppercase letter (A-Z).
			- At least one digit (0-9).
			- At least one special character from the following set: 
					[-+=!$%^&*()_|~`{}[]:/;<>?,.@#'" ] (Note: This set also includes whitespace).
			- A minimum length of 8 characters.
			- Only characters from the specified sets (lowercase, uppercase, digits, special characters) are allowed.
			*/
}
function isValidEmail(email) {
	var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return regex.test(email);
}
