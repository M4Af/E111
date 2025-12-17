const passwordsModel = require('../models/passwordsModel');
const { encrypt, decrypt } = require('../utils/crypto');

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}

function isValidPassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
}

async function getAll(req, res) {
    const { query, field, sort } = req.query;

    let titleFilter = null;
    let mailFilter = null;

    if (query && field === 'title') {
        titleFilter = query.trim();
    }

    if (query && field === 'mail') {
        mailFilter = query.trim();
    }

    const passwords = await passwordsModel.getAllPasswords(
        titleFilter,
        mailFilter,
        sort
    );

    res.render('pages/index', {
        passwords,
        query,
        field,
        sort
    });
}

function getAddForm(req, res) {
    res.render('pages/add');
}

async function postAdd(req, res) {
    const title = req.body.title.trim();
    const mail = req.body.mail.trim();
    const password = req.body.password;

    if (!title) {
        return res.render('pages/error', { message: 'Brak tytułu' });
    }

    if (!isValidEmail(mail)) {
        return res.render('pages/error', { message: 'Niepoprawny email' });
    }

    if (!isValidPassword(password)) {
        return res.render('pages/error', {
            message: 'Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny'
        });
    }

    const encryptedPassword = encrypt(password);

    await passwordsModel.addPassword(title, mail, encryptedPassword);
    res.redirect('/');
}

async function getEditForm(req, res) {
    const pw = await passwordsModel.getPasswordById(req.params.id);
    if (!pw) {
        return res.render('pages/error', { message: 'Nie znaleziono rekordu' });
    }

    res.render('pages/edit', { pw });
}

async function postEdit(req, res) {
    const title = req.body.title.trim();
    const mail = req.body.mail.trim();
    const newPassword = req.body.newPassword;
    const repeatPassword = req.body.repeatPassword;

    if (!title) {
        return res.render('pages/error', { message: 'Brak tytułu' });
    }

    if (!isValidEmail(mail)) {
        return res.render('pages/error', { message: 'Niepoprawny email' });
    }

    let encryptedPassword = null;

    if (newPassword || repeatPassword) {
        if (newPassword !== repeatPassword) {
            return res.render('pages/error', { message: 'Hasła nie są takie same' });
        }

        if (!isValidPassword(newPassword)) {
            return res.render('pages/error', {
                message: 'Hasło musi mieć min. 8 znaków, cyfrę i znak specjalny'
            });
        }

        encryptedPassword = encrypt(newPassword);
    }

    await passwordsModel.updatePassword(
        req.params.id,
        title,
        mail,
        encryptedPassword
    );

    res.redirect('/');
}

async function getDetails(req, res) {
    const pw = await passwordsModel.getPasswordById(req.params.id);
    if (!pw) {
        return res.render('pages/error', { message: 'Nie znaleziono rekordu' });
    }

    let decryptedPassword = '';
    try {
        decryptedPassword = decrypt(pw.passwordHash);
    } catch (err) {
        return res.render('pages/error', {
            message: 'Błąd odszyfrowania hasła'
        });
    }

    res.render('pages/details', {
        pw,
        decryptedPassword
    });
}

async function deletePassword(req, res) {
    await passwordsModel.deletePassword(req.params.id);
    res.redirect('/');
}

module.exports = {
    getAll,
    getAddForm,
    postAdd,
    getEditForm,
    postEdit,
    getDetails,
    deletePassword
};
