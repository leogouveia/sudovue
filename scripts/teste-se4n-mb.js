const WRONG_GRID = [
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9]
]

check_rows(WRONG_GRID)

function check_rows(grid) {
    for (let i = 0; i < grid.length; i++) {
        check_row(grid[i])
    }
}

function check_row(row) {
    row.forEach(function(cell) {
        console.log(cell)
    }, this);
}

function check_columns(grid) {
    for (var x = 0; x < grid.length; x++) {
        let row = grid[x];
        for (var y = 0; y < row.length; y++) {
            column = row[x][y];
        }
        check_row(column);
        return;
    }
}