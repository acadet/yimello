/// <reference path="../test_dependencies.ts" />

module Mocks {
	export module Utils {
		export class Person extends TSObject {
			id : number;
			firstName : string;
			lastName : string;

			static toPerson(o : any) : Person {
				var p : Person = new Person();
				p.id = o.id;
				p.firstName = o.firstName;
				p.lastName = o.lastName;

				return p;
			}

			fromPerson() : any {
				var o : any = {};

				o.id = this.id;
				o.firstName = this.firstName;
				o.lastName = this.lastName;

				return o;
			}

			equals(obj : any) : boolean {
				var p : Person;

				if (obj instanceof Person) {
					p = <Person> obj;

					if (this.id !== p.id) {
						return false;
					}

					if (this.firstName !== p.firstName) {
						return false;
					}

					if (this.lastName !== p.lastName) {
						return false;
					}

					return true;
				}

				return false;
			}
		}
	}
}
