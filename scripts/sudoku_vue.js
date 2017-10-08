/*!
* SudoCAIXA
* Leonardo de Albuquerque Gouveia <c077914>
* Licensed under the MIT license - http://opensource.org/licenses/MIT
*/
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello',
        grid: [],
        initialGrid: [],
        completedGame: false,
        showGrid: false
    },
    methods: {
        checkValue: function(inputValue, rowIndex, cellIndex, event) {
            var element = event.currentTarget;
            var self = this

            /** is it a number? */
            if (!isNaN(parseFloat(inputValue)) && isFinite(inputValue) && inputValue > 0) {
                /** is it valid in grid? */
                if(SudokuChecker.check(this.grid)) {
                    element.style.color = 'green'
                    this.animateCss(element, 'bounceIn')
                    this.grid[rowIndex][cellIndex] = inputValue
                    if (SudokuCreator.is_grid_complete(this.grid)) 
                        self.completeGrid(false)
                    return
                }
            } 

            /* if value is not valid in grid or not a digit within 1..9 */
            element.style.color = 'red'
            this.animateCss(element, 'flipOutX', function() {
                element.value = ''
                self.grid[rowIndex][cellIndex] = ''
            })
        },
        animateCss: function(el, animationType, callback) {
            var cb = callback
            $(el).addClass('animated ' + animationType)  
            $(el).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    console.log('oi')
                    $(this).removeClass('animated ' + animationType)
                    if (cb)
                        cb()
                }
            )
        },
        completeGrid: function(machine = true) {
            this.grid = SudokuCreator.solve(this.initialGrid)
            if (!machine)
                this.openClompletedGameModal()
        },
        newGrid: function() {
            var self = this
            this.showGrid = false
            this.grid = SudokuCreator.create_grid(40)

            this.initialGrid = SudokuCreator.copy_grid(this.grid), setTimeout(function() {
                self.showGrid = true
            }, 500)
        },
        openClompletedGameModal: function() {
            var self = this
            setTimeout(function() {
                self.completedGame = true
                var modalEl = document.querySelectorAll('#modal-completed-game .modal-card')
                self.animateCss(modalEl, 'bounceIn', false)
            }, 1000)
            
        },
        closeCompletedGameModal: function() {
            var self = this;
            this.animateCss(document.querySelectorAll('#modal-completed-game .modal-card'), 'bounceOut', function() {
                $('#modal-completed-game').removeClass('is-active')
                self.completedGame = false
                self.newGrid()
            })
        }
    },
    computed: {
        viewGrid: {
            get: function() {
                for (var a = this.grid, b = 0; b < a.length; b++)
                    for (var c = 0; c < a[b].length; c++) 0 == a[b][c] && (a[b][c] = '');
                return a
            }
        }
    },
    created: function() {
        this.newGrid()
    }
});