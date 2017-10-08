var SudokuChecker = {
    check: function(grid) {
    
        if (!this.row_check(grid))
            return false
        if (!this.column_check(grid))
            return false
        if(!this.square_check(grid))
            return false
        return true

    },
    column_check: function(grid) {
        return this.row_check(this.get_column_grid(grid));
    },
    square_check: function(grid) {
        return this.row_check(this.get_square_grid(grid))
    },
    row_check: function(grid) {
        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < (grid[x]).length; y++) {
                if (!this.check_row(grid[x][y], grid[x]))
                    return false;
            }
        }
        return true
    },
    check_row: function(value, row) {
        let cont = 0

        if (value == 0)
                return true

        for (var index = 0; index < row.length; index++) {
            if (row[index] == value)
                cont = cont + 1

            if (cont > 1)
                return false
        }
        return true
    },
    get_column_grid: function(grid) {
        let columns = []
        for (let y = 0; y < grid.length; y++) {
            var column = []
            for (let x = 0; x < (grid[y]).length; x++) {
            column.push(grid[x][y])
            }
            columns.push(column)
        }
        return columns
    },
    get_square_grid: function(grid) {
        let new_grid = []
        let row

        for(let w = 0; w < 9; w+=3) {
            for(let z = 0; z < 9; z+=3) {
                row = [];
                for (let y = (0 + w); y < (3 + w); y++) {
                    for(let x = (0 + z); x < (3 + z); x++) {
                        row.push(grid[x][y])
                    }
                }
                new_grid.push(row)
            }
        }

    return new_grid
    }

}

var SudokuCreator = {
    create_empty_grid: function() {
        let grid = []
        cont = 10
        for(let x = 0; x < 9; x++) {
            rows = []
            for(let y = 0; y < 9; y++) {
            rows.push(0)
            }
            grid.push(rows)
        }
        return grid
    },
    create_grid: function(quantity) {
        var grid = this.create_empty_grid()
        var count = 0

        var randomQty = 2

        /* create a solvable grid with 2 random numbers */
        do {
            let x = Math.floor(Math.random() * 9)
            let y = Math.floor(Math.random() * 9)
            do {
                let v = Math.floor(Math.random() * 9) + 1
                grid[x][y] = v
            } while(!SudokuChecker.check(grid))

        } while (this.count_empty_values(grid) > (81-randomQty) || !this.solve(grid))
        
        /* If quantity of cells asked is 2, return the grid, if not get complete filled grid */
        if (quantity == randomQty)
            return grid
        else
            grid = this.solve(grid)

        /* Blank values until match number of filled cells asked */
        while (this.count_empty_values(grid) < (81 - quantity)) {
            let x = Math.floor(Math.random() * 9)
            let y = Math.floor(Math.random() * 9)
            grid[x][y] = 0
            
        } 
        return grid
    },
    copy_grid: function(grid) {
        let new_grid = []
        for (let i = 0; i < grid.length; i++)
            new_grid[i] = grid[i].slice(0);
        return new_grid
    },
    is_grid_complete: function(grid) {
        for (let x = 0; x < grid.length; x++) {
            for(let y = 0; y < (grid[x]).length; y++) {
                if (grid[x][y] == 0)
                    return false
            }
        }
        return true
    },
    count_empty_values: function(grid) {
        let count = 0

        for (let x = 0; x < grid.length; x++) {
            let element = grid[x];
            for (let y = 0; y < (grid[x]).length; y++) {
                if (grid[x][y] == 0)
                    count++
            }
        }
        return count
    },
    solve: function(grid) {
        let counter = 1
        let new_grid = this.copy_grid(grid)
        let updown = 1
        let x = 0
        let y = 0

        /* if not starting (counter 0) or complete grid (counter 82) */
        while (counter>0 && counter<82) {

            /* convert counter to array x,y pointers */
            x = (Math.floor((counter-1)/9))
            y = (((counter-1)%9))

            /* if current original cell is zero and new cell is not 9 */
            if(grid[x][y] == 0
                && new_grid[x][y] < 9) {

                    updown = 1

                    new_grid[x][y] = new_grid[x][y] + 1

                    if (SudokuChecker.check(new_grid)) {
                        counter++
                    }  
            /*current cell was originally empty, but we have tried all
                % possible entries */
            } else if(grid[x][y] == 0) {
                new_grid[x][y] = 0
                counter--
                updown = -1
            /* case: current cell was filled at the beginning. Jump to next cell. */
            } else {
                if (updown == 1)
                    counter++
                else
                    counter--
            }
        }
        
        /* Se houver algum valor vazio, é um sudoku irresolvivel */
        if (this.count_empty_values(new_grid) > 0) {
            console.log("Grid insolvivel")
            return false
        }
            
        /* thanks to http://www.math.cornell.edu/~mec/Summer2009/meerkamp/Site/Solving_any_Sudoku_I.html
            original script in Matlab */
        return new_grid
    }
}

const INVALID_GRID = [
    [1,2,3,4,5,6,7,8,9],
    [5,4,6,4,5,6,7,8,9],
    [7,8,9,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9]
]

const VALID_GRID = [
    [6,3,9,5,7,4,1,8,2],
    [5,4,1,8,2,9,3,7,6],
    [7,8,2,6,1,3,9,5,4],
    [1,9,8,4,6,7,5,2,3],
    [3,6,5,9,8,2,4,1,7],
    [4,2,7,1,3,5,8,6,9],
    [9,5,6,7,4,8,2,3,1],
    [8,1,3,2,9,6,7,4,5],
    [2,7,4,3,5,1,6,9,8]
]


//http://www.math.cornell.edu/~mec/Summer2009/meerkamp/Site/Solving_any_Sudoku_I.html