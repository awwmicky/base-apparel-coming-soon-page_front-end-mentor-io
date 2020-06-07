const $form = document.forms['hero_form'];
const $email = document.forms['hero_form'].email;
const $inpMsg = document.querySelector('.input-msg');
const $submitBtn = document.forms['hero_form'].submit;



$form.addEventListener('submit', (e) => {
    e.preventDefault()
  
    /* 
    - invalid-inp
    - approved-msg
    - invalid-msg
    - approved-btn
    - loading-btn
    - invalid-btn
    */

    const setApproved = (email, msg) => {
        let form = email.parentElement;
        form.classList.remove('invalid-inp')
        form.reset()

        let inpMsg = email.nextElementSibling;
        inpMsg.classList.add('approved-msg')
        inpMsg.innerHTML = msg;
        inpMsg.removeAttribute('hidden')

        let submitBtn = email.nextElementSibling.nextElementSibling;
        submitBtn.textContent = '✓';
        submitBtn.classList.replace('loading-btn', 'approved-btn')
    }

    const setInvalid = (email, msg) => {
        let form = email.parentElement;
        form.classList.add('invalid-inp')
        
        let inpMsg = email.nextElementSibling;
        inpMsg.textContent = msg;
        inpMsg.classList.add('invalid-msg')
        inpMsg.removeAttribute('hidden')
    };

    const checkEmail = (field) => {
        const email = field.value.trim();
        const containAtSymbol = /[@]/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        

        if (!email) {
            setInvalid(field, `${field.name} is required`)
            return false;
        }

        if ( !containAtSymbol.test(email) ) {
            setInvalid(field, `${field.name} must contain an "@" symbol`)
            return false;
        }

        if ( !regexEmail.test(email) ) {
            setInvalid(field, `please enter a valid ${field.name}`)
            return false;
        }

        return true;
    };

    let arrow = $submitBtn.innerHTML;
    
    if ( checkEmail($email) ) {
        /* send, loading */
        $submitBtn.innerHTML = "◌";
        $submitBtn.classList.add('loading-btn')
        $submitBtn.setAttribute('disabled', '')
        
        setTimeout(() => {
            /* sent, approved */
            setApproved($email, "Email sent. Thank you.")

            setTimeout(() => {
                /* complete, reset */
                $inpMsg.innerHTML = '';
                $inpMsg.classList.remove('approved-msg')
                $inpMsg.setAttribute('hidden', '')
                
                $submitBtn.innerHTML = arrow;
                $submitBtn.classList.remove('approved-btn')
                $submitBtn.removeAttribute('disabled')
            }, 2000)
        }, 1500)
    } else {
        /* not sent, invalid */
        $submitBtn.innerHTML= "⊘";
        $submitBtn.classList.add('invalid-btn')
        $submitBtn.setAttribute('disabled', '')
        
        setTimeout(() => {
            /* incomplete, restore */
            $inpMsg.innerHTML = '';
            $inpMsg.classList.remove('invalid-msg')
            $inpMsg.setAttribute('hidden', '')

            $submitBtn.innerHTML = arrow;
            $submitBtn.classList.remove('invalid-btn')
            $submitBtn.removeAttribute('disabled')
        }, 2000) 
    }
})