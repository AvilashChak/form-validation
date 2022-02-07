const formData = () => {

	return {

		isSubmitted: false,
		errorStatus: false,

		fields: {

			firstName: {
				reqd: true,
				type: 'text',
				value: '',
				isError: true,
				errorMessage: 'Required',
			},
			lastName: {
				reqd: false,
				type: 'text',
				value: '',
				isError: true,
				errorMessage: 'Required',
			},
			email: {
				reqd: true,
				type: 'email',
				value: '',
				isError: true,
				errorMessage: 'Required',
			},
			gender: {
				reqd: true,
				type: 'radio',
				value: null,
				isError: true,
				errorMessage: 'Required',
			},
			education: {
				reqd: true,
				type: 'select',
				value: '0',
				isError: true,
				errorMessage: 'Required',
			},
			skill: {
				reqd: true,
				type: 'checkbox',
				value: [],
				isError: true,
				errorMessage: 'Required',
			},
			about: {
				reqd: true,
				type: 'textarea',
				value: '',
				isError: true,
				errorMessage: 'Required',
			}

		}

	}

};

function checkField(form, field, type, data) {

	const formFields = form.fields;

	if ( type === 'text' || type === 'email' || type === 'textarea' ) {

		data = data.trim();

		formFields[field].value = data;

		//check firstName
		if ( field === 'firstName' ) {

			if ( !data ) {

				form.errorStatus = true;
				return;
			}

			else if ( data.length < 4 ) {

				formFields[field].errorMessage = 'Invalid, name must be atleast 4 characters long';

				form.errorStatus = true;
				return;

			}

			// reset firstName field error
			formFields[field].isError = false;

		}
		// check email
		else if ( field === 'email' ) {

			if ( !data.match(/.*\@.*\..*/) ) {

				form.errorStatus = true;
				return;
			}

			// reset email field error
			formFields[field].isError = false;

		}


		// check about
		else if ( field === 'about' ) {

			if ( !data ) {

				form.errorStatus = true;
				return;
			}

			else if ( data.length < 10 ) {

				formFields[field].errorMessage = 'You must write 10 or more characters about yourself';

				form.errorStatus = true;
				return;

			}
			// reset about field error
			formFields[field].isError = false;

		}


	}

	if ( type === 'radio' || type === 'checkbox' ) {

		if ( !data.length ) {

			form.errorStatus = true;
			return;
		}

		formFields[field].value = data;

		// reset field error
		formFields[field].isError = false;

	}

	if ( type === 'select' ) {

		if ( data === '0' ) {

			form.errorStatus = true;
			return;

		}

		formFields[field].value = data;

		// reset field error
		formFields[field].isError = false;

	}


}

exports.validation = function(postData) {

	const form = formData();

	if (!postData) 
		return form;

	else
		form.isSubmitted = true;

	const formFields = form.fields;

	for ( field in formFields ) {

		// reqd field
		if ( formFields[field].reqd ) {

			if ( field in postData ) {

				checkField(form, field, formFields[field].type, postData[field]);

			}
			else {

				form.errorStatus = true;
			}

		}

		// non reqd fields
		else if ( field in postData ) {

			formFields[field].value = postData[field].trim();
		}

	}

	return form;

};