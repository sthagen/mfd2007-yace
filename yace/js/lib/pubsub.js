/*
MIT License

Copyright (c) 2018 Andy Bell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/Andy-set-studio/vanilla-js-state-management

*/

export default class PubSub {
    constructor() {
        this.events = {};
    }

    /**
     * Either create a new event instance for passed `event` name
     * or push a new callback into the existing collection
     *
     * @param {string} event
     * @param {function} callback
     * @returns {number} A count of callbacks for this event
     * @memberof PubSub
     */
    subscribe(event, callback) {
        
        let self = this;
        
        // If there's not already an event with this name set in our collection
        // go ahead and create a new one and set it with an empty array, so we don't
        // have to type check it later down-the-line
        if(!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }
        
        // We know we've got an array for this event, so push our callback in there with no fuss
        return self.events[event].push(callback);
    }

    /**
     * If the passed event has callbacks attached to it, loop through each one
     * and call it
     *
     * @param {string} event
     * @param {object} [data={}]
     * @returns {array} The callbacks for this event, or an empty array if no event exits
     * @memberof PubSub
     */
    publish(event, data = {}) {
        let self = this;
        
        // There's no event to publish to, so bail out
        if(!self.events.hasOwnProperty(event)) {
            return [];
        }
        
        // Get each subscription and call its callback with the passed data
        return self.events[event].map(callback => callback(data));
    }
}