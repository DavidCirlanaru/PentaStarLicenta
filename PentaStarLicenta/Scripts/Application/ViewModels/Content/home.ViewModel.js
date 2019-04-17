define('home.viewModel',
    ['viewHandler', 'rooms.viewModel'],
    function (roomsViewModel ) {
        'use strict';


        //Client Details
        var newClientFirstName = ko.observable('').extend({
            minLength: { params: 3, message: "Prenumele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Prenumele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga prenume"
            }
        });

        var newClientLastName = ko.observable('').extend({
            minLength: { params: 3, message: "Numele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Numele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga nume"
            }
        });

        var newClientCnp = ko.observable('').extend({
            number: { params: true, message: "CNP-ul este format doar din numere" },
            minLength: { params: 13, message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            maxLength: { params: 13, message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            required: {
                message: "Adauga CNP"
            }
        });

        var newClientIdentityCard = ko.observable('').extend({
            pattern: { params: /^[a-zA-Z]{2}\s+[0-9]{6}$/, message: 'Seria & Nr trebuie sa fie de forma "AA 123456" ' },
            required: {
                message: "Adauga Serie & Nr"
            }
        });

        var newClientEmail = ko.observable('').extend({
            pattern: { params: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email-ul nu este valid" ' },
            required: {
                message: "Adauga mail"
            }
        });

        var newClientPhone = ko.observable('').extend({
            pattern: { params: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, message: 'Numarul de telefon nu este valid" ' },
            required: {
                message: "Adauga numar de telefon"
            }
        });

        var newClientNationality = ko.observable('').extend({
            minLength: { params: 3, message: "Tara trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Tara nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga tara"
            }
        });

        var errors = ko.validation.group([newClientFirstName, newClientLastName, newClientCnp,
            newClientIdentityCard, newClientEmail, newClientPhone, newClientNationality,]);
        //errors.showAllMessages();

        //For dropdown with Room Types
        var availableRoomTypes = ko.observableArray([]);
        var selectedRoomType = ko.observable();

        return {
            newClientFirstName: newClientFirstName,
            newClientLastName: newClientLastName,
            newClientCnp: newClientCnp,
            newClientIdentityCard: newClientIdentityCard,
            newClientEmail: newClientEmail,
            newClientPhone: newClientPhone,
            newClientNationality: newClientNationality

        };
    });