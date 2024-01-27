"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const store_1 = require("./store");
function Register() {
    const [registerHidden, setRigesterHidden] = (0, react_2.useState)(false);
    const [logInHidden, setLogInHidden] = (0, react_2.useState)(true);
    const [name, setName] = (0, react_2.useState)('');
    const [email, setEmail] = (0, react_2.useState)('');
    const [password, setPassword] = (0, react_2.useState)('');
    const { setToken } = (0, store_1.useNotesStore)();
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        const user = {
            name,
            email,
            password,
        };
        try {
            const response = yield fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('User already exists');
            }
            const result = yield response.json();
            console.log('Parsed Result:', result);
            const token = result.token;
            setToken(token);
        }
        catch (error) {
            alert('User already exists');
            console.error('Registration error:', error);
        }
    });
    const handleLogInSubmit = () => __awaiter(this, void 0, void 0, function* () {
        const userCredentials = {
            email: email,
            password: password,
        };
        console.log('User Credentials:', userCredentials);
        try {
            const response = yield fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });
            if (response.ok) {
                const result = yield response.json();
                const token = result.token;
                setToken(token);
                console.log('Parsed Result:', result);
                if (result.error) {
                    alert(result.error);
                }
            }
            else {
                throw new Error('Invalid credentials');
            }
        }
        catch (error) {
            alert('Email and password not matching!');
            console.error('Login error:', error);
        }
    });
    const handleRegister = () => {
        setRigesterHidden(false);
        setLogInHidden(true);
    };
    const handleLogIn = () => {
        setRigesterHidden(true);
        setLogInHidden(false);
    };
    return (react_1.default.createElement("div", { className: 'flex justify-center w-full items-center' },
        react_1.default.createElement("div", { className: 'flex gap-5 items-center justify-center bg-gray-200 absolute top-5 mx-auto' },
            react_1.default.createElement("div", { className: 'bg-gray-100' },
                react_1.default.createElement("h1", { className: 'text-2xl text-center ' }, "Welcome to the Notes App "),
                react_1.default.createElement("img", { src: "./test.png", alt: "welcome" })),
            react_1.default.createElement("div", { className: registerHidden ? 'hidden' : '' },
                react_1.default.createElement("div", { className: ' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' },
                    react_1.default.createElement("span", { className: 'flex flex-col ' },
                        react_1.default.createElement("label", { htmlFor: "name", className: 'text-xl' }, "Name:"),
                        react_1.default.createElement("input", { type: "text", name: "name", id: "name", className: 'rounded-md px-4 py-1', value: name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement("span", { className: 'flex flex-col ' },
                        react_1.default.createElement("label", { htmlFor: "email", className: 'text-xl' }, "Email:"),
                        react_1.default.createElement("input", { type: "email", name: "email", id: "email", className: 'rounded-md px-4 py-1', value: email, onChange: (e) => setEmail(e.target.value) })),
                    react_1.default.createElement("span", { className: 'flex flex-col' },
                        react_1.default.createElement("label", { htmlFor: "password", className: 'text-xl' }, "Password:"),
                        react_1.default.createElement("input", { type: "password", name: "password", id: "password", className: 'rounded-md px-4 py-1', value: password, onChange: (e) => setPassword(e.target.value) })),
                    react_1.default.createElement("div", { className: 'flex flex-col items-center' },
                        react_1.default.createElement("button", { type: "button", className: 'bg-blue-200 p-4 rounded-xl', onClick: handleSubmit }, "register"),
                        react_1.default.createElement("p", { className: 'p-2 text-blue-500 underline', onClick: handleLogIn }, "already have an account?")))),
            react_1.default.createElement("div", { className: logInHidden ? 'hidden' : '' },
                react_1.default.createElement("div", { className: ' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' },
                    react_1.default.createElement("span", { className: 'flex flex-col ' },
                        react_1.default.createElement("label", { htmlFor: "exist-email", className: 'text-xl' }, "Email:"),
                        react_1.default.createElement("input", { type: "email", name: "exist-email", id: "exist-email", className: 'rounded-md px-4 py-1', value: email, onChange: (e) => setEmail(e.target.value) })),
                    react_1.default.createElement("span", { className: 'flex flex-col' },
                        react_1.default.createElement("label", { htmlFor: "exist-password", className: 'text-xl' }, "Password:"),
                        react_1.default.createElement("input", { type: "password", name: "exist-password", id: "exist-password", className: 'rounded-md px-4 py-1', value: password, onChange: (e) => setPassword(e.target.value) })),
                    react_1.default.createElement("div", { className: 'flex flex-col items-center' },
                        react_1.default.createElement("button", { type: "button", className: 'bg-blue-200 p-4 rounded-xl', onClick: handleLogInSubmit }, "Log In"),
                        react_1.default.createElement("p", { className: 'p-2 text-blue-500 underline', onClick: handleRegister }, "New to Notes App? Register Now!")))))));
}
exports.default = Register;
