import {Service, Container, Inject} from "typedi";
import "reflect-metadata";
import {z} from "zod";
import {usePage} from "@inertiajs/react";
import Language from "@/models/language/Language";

type Translations = {
    [code: string] : {
        name: string,
        description: string,
    }[]
}

@Service()
class FormService {
    // private languages = usePage().props.settings.languages;
    constructor(
    ) {

    }

    generateControllerName = (groupName: string) => {
        return groupName + '.';
    }

    generateDefaultValues = (languages: Language[]) => {
        let translations: Translations = {};
        languages.map(language => language.code).map(code => {
            Object.assign(translations, {
                [code]: {name: '', description : '', brief: ''},
            })
        });
        return translations;
    }

    generateDefaultTitles = (languages: Language[]) => {
        let translations: Translations = {};
        languages.map(language => language.code).map(code => {
            Object.assign(translations, {
                [code]: {name: ''},
            })
        });
        return translations;
    }

    isNumeric = (val: string): boolean => {
        return !isNaN(Number(val));
    }

    isPositive = (val: string): boolean => {
        return !isNaN(parseFloat(val)) && parseFloat(val) >= 0;
    }

    formQuery = (...args: {key: string, value: any} []) => {
        let query = '';
        args.forEach(arg => {
            if (query.length === 0) query = query + '?';
            else query = query + '&';
            query = query + arg.key + '=' + arg.value
        })

        return query;
    }
}

export default FormService;
