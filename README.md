prvo pokrenuti laravel projekat koji se nalazi u folderu fudbalski_turniri
otvoriti termianl i poslati sledece komande istim redom

php artisan migrate:fresh
php artisan db:seed
php artisan serve

sa ovim smo omogucili da nam laravel funkcionise tj. generisali smo tabelu sa migracijama i onda smo generisali podatke sa ovim drugim delom

sada mozemo da pristupamo api rutama preko postman-a i da ih koristima u nasem react-u

react startamo sa

npm install

npm start
