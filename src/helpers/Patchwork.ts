/// <reference path="../dependencies.ts" />

module PatchworkModule {
	
	class Point extends TSObject {
		constructor(x: number, y: number) {
			super();

			this._x = x;
			this._y = y;
		}

		getX() : number {
			return this._x;
		}

		getY() : number {
			return this._y;
		}

		toString() : string {
			return this._x + ',' + this._y;
		}

		private _x: number;
		private _y: number;
	}

	class Triangle extends TSObject {
		constructor(e1: Point, e2: Point, e3: Point) {
			super();

			this._e1 = e1;
			this._e2 = e2;
			this._e3 = e3;
		}

		build() : string {
			var sbf : StringBuffer = new StringBuffer('<polygon points="');

			sbf
				.append(this._e1.toString())
				.append(' ')
				.append(this._e2.toString())
				.append(' ')
				.append(this._e3.toString());

			sbf.append('" style="stroke: black; stroke-width: 1; fill: white;" />');

			return sbf.toString();
		}

		private _e1 : Point;
		private _e2 : Point;
		private _e3 : Point;
	}

	class Line extends TSObject {
		constructor(e1 : Point, e2 : Point) {
			super();

			this._e1 = e1;
			this._e2 = e2;
		}

		build() : string {
			var sbf : StringBuffer = new StringBuffer('<line style="stroke-width: 1; stroke: black;" ');

			sbf
				.append('x1="' + this._e1.getX() + '" ')
				.append('y1="' + this._e1.getY() + '" ')
				.append('x2="' + this._e2.getX() + '" ')
				.append('y2="' + this._e2.getY() + '" ');

			return sbf.append(' />').toString();
		}

		private _e1 : Point;
		private _e2 : Point;
	}

	export class Patchwork extends TSObject {

		static setLength(value : number) : void {
			Patchwork._length = value;
		}

		static build(className = 'patchwork') : void {
			Patchwork._target = DOMTree.findSingle('.' + className);

			var x: number = 0;
			var y: number = 0;
			var h: number = Patchwork._length / 2 * Math.sqrt(3);
			var content : StringBuffer = new StringBuffer();

			while (y < Patchwork._target.getHeight()) {
				while (x < Patchwork._target.getWidth()) {
					
					var t1 : Triangle = 
						new Triangle(
							new Point(x, y),
							new Point(x + Patchwork._length, y),
							new Point(x + Patchwork._length / 2, y + h)
						);					
					var t2 : Triangle =
						new Triangle(
							new Point(x, y + 2 * h),
							new Point(x + Patchwork._length / 2, y + h),
							new Point(x + Patchwork._length, y + 2 * h)
						);

					var line = new Line(new Point(x, y + h), new Point(x + Patchwork._length, y + h));

					content
						.append(t1.build())
						.append(t2.build())
						.append(line.build());

					x += Patchwork._length;
				}
				
				x = 0;
				y += 2 * h;
			}

			Patchwork._target.append('<svg>' + content.toString() + '</svg>');

			Patchwork._canvas = Patchwork._target.findSingle('svg');
			
			Patchwork._canvas.setCss({
				'width' : '100%',
				'height' : '100%'
			});
		}

		private static _target: DOMElement;
		private static _canvas: DOMElement;
		private static _length : number = 30;
	}
}