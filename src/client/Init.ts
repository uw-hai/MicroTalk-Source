class Init {
    private static USER_ID: string = '';

    private static CHARS: Array<string> = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ'.split('');
    private static ID_LENGTH: Number = 32;
    private static LOCAL_STORAGE_ID: string = 'USER_ID';

    public static getID(): string {
        if (Init.USER_ID === '' && localStorage[Init.LOCAL_STORAGE_ID]) {
            Init.USER_ID = localStorage[Init.LOCAL_STORAGE_ID];
        } else if (Init.USER_ID === '') {
            var userId = '';
            for (var i = 0; i < Init.ID_LENGTH; i++) {
                var index = Math.floor(Math.random() * Init.CHARS.length);
                userId += Init.CHARS[index];
            }

            Init.USER_ID = userId;
            localStorage.setItem(Init.LOCAL_STORAGE_ID, userId);
        }

        return Init.USER_ID;
    }
}

export = Init;
