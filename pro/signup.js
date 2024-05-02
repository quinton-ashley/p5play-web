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
function checkPasswordMatch() {
	var hasUsername = $('input[name="username"]').val() != '';
	var password = $('input[name="password"]').val();
	var hasValidPassword = checkPasswordHelper(password);
	var formSubmitted = false;
	var nodes = document.getElementsByName('signupform');
	for (var i = 0; i < nodes.length; i++) {
		formSubmitted = !!nodes[i].submitted || formSubmitted;
	}
	var canSubmit = hasUsername && hasValidPassword && !formSubmitted;
	$('button[name="signUpButton"]').prop('disabled', !canSubmit);
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

function checkIfValid() {
	// Check if the full name input is valid
	if ($('#full-name').val().length > 0) {
		$('#full-name').removeClass('not-valid');
		$('#full-name').addClass('is-valid');
	} else {
		$('#full-name').removeClass('is-valid');
		$('#full-name').addClass('not-valid');
	}

	// Check if the gender input is valid
	if ($('#gender').val().length > 0) {
		$('#gender').removeClass('not-valid');
		$('#gender').addClass('is-valid');
	} else {
		$('#gender').removeClass('is-valid');
		$('#gender').addClass('not-valid');
	}

	// Check if the country input is valid
	if ($('#country').val().length > 0) {
		$('#country').removeClass('not-valid');
		$('#country').addClass('is-valid');
	} else {
		$('#country').removeClass('is-valid');
		$('#country').addClass('not-valid');
	}

	// Check if the birthday input is valid
	var enteredDate = new Date($('#birthday').val());

	var today = new Date();
	today.setHours(0, 0, 0, 0);

	if (enteredDate && enteredDate < today) {
		$('#birthday').removeClass('not-valid');
		$('#birthday').addClass('is-valid');
	} else {
		$('#birthday').removeClass('is-valid');
		$('#birthday').addClass('not-valid');
	}

	// Check if the email input is valid
	if (isValidEmail($('#email').val())) {
		$('#email').removeClass('not-valid');
		$('#email').addClass('is-valid');
	} else {
		$('#email').removeClass('is-valid');
		$('#email').addClass('not-valid');
	}

	// Check if the password input is valid
	if (isValidPassword($('#password').val())) {
		$('#password').removeClass('not-valid');
		$('#password').addClass('is-valid');
	} else {
		$('#password').removeClass('is-valid');
		$('#password').addClass('not-valid');
	}
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

// To set the max birthday
$(document).ready(function () {
	$('#birthday').attr('max', new Date().toISOString().split('T')[0]);
});
