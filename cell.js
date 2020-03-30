class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.isWall = false;
        this.parent = null;
        
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    show() {
        fill(51);
        stroke(255);
        rect(this.x, this.y, scl, scl);
        this.showWall();
    }

    highlight() {
        fill(255, 0, 0);
        stroke(255);
        rect(this.x, this.y, scl, scl);
    }

    showPath() {
        fill(0, 255, 0);
        stroke(255);
        rect(this.x, this.y, scl, scl);
    }

    showWall() {
        if (this.isWall) {
            fill(150);
            stroke(255);
            rect(this.x, this.y, scl, scl);
        }
    }
}