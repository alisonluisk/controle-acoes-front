import PNotify from "pnotify/dist/es/PNotify";

const config = {
    'dir1': 'up',
    'dir2': 'left',
    'firstpos1': 25,
    'firstpos2': 25,
};

class MessageService {
    
    successMessage(title, text) {
        PNotify.success({
            title: title,
            text: text,
            stack: config,
            delay: 3000,
        });
    }
    
    infoMessage(title, text) {
        PNotify.info({
            title: title,
            text: text,
            stack: config,
            delay: 3000,
        });
    }
    
    errorMessage(title, text) {
        PNotify.error({
            title: title,
            text: text,
            stack: config,
            delay: 3000,
        });
    }
}

const instance = new MessageService();

export default instance;