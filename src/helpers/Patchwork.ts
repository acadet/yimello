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

			sbf.append('" />');

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
			var x: number = 0;
			var y: number = 0;
			var h: number = Patchwork._length / 2 * Math.sqrt(3);
			var content : StringBuffer = new StringBuffer();


			Patchwork._target = DOMTree.findSingle('.' + className);

			while (y < Patchwork._target.getHeight()) {
				while (x < Patchwork._target.getWidth()) {

					var t1 : Triangle =
						new Triangle(
							new Point(x, y + h),
							new Point(x + Patchwork._length / 2, y),
							new Point(x + Patchwork._length, y + h)
						);

					var t2 : Triangle = 
						new Triangle(
							new Point(x + Patchwork._length / 2, y),
							new Point(x + Patchwork._length * 3 / 2, y),
							new Point(x + Patchwork._length, y + h)
						);

					var t3 : Triangle = 
						new Triangle(
							new Point(x, y + h),
							new Point(x + Patchwork._length, y + h),
							new Point(x + Patchwork._length / 2, y + 2 * h)
						);

					var t4 : Triangle = 
						new Triangle(
							new Point(x + Patchwork._length / 2, y + 2 * h),
							new Point(x + Patchwork._length, y + h),
							new Point(x + Patchwork._length * 3 / 2, y + 2 * h)
						);

					content
						.append(t1.build())
						.append(t2.build())
						.append(t3.build())
						.append(t4.build());

					x += Patchwork._length;
				}
				
				x = 0;
				y += 2 * h;
			}

			Patchwork._target.append(DOMElement.fromString('<svg>' + content.toString() + '</svg>'));

			Patchwork._canvas = Patchwork._target.findSingle('svg');
			
			Patchwork._canvas.setCss({
				position: 'absolute',
				top: 0,
				width: Patchwork._target.getWidth() + Patchwork._length,
				left: Patchwork._target.getLeft() - Patchwork._length / 2,
				height: '100%'
			});
		}

		private static _target: DOMElement;
		private static _canvas: DOMElement;
		private static _length : number = 50;
	}
}