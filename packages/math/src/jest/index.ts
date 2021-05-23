declare namespace jest {
    interface Matchers<R> {
        /**
         * Used when you want to confirm whether the received is 0.
         * 
         * The received including 0, -0, +0 returns true.
         */
        toBeUnsignedZero(value: 0): R;
    }
}

expect.extend({
    toBeUnsignedZero(received: number, value: 0) {
        const pass = received === value;
        return {
            pass,
            message() {
                return pass ?
                    `Received ${received} equals 0` :
                    `Received ${received} is not equal to 0`;
            }
        }
    }
});