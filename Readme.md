# a useful demo to fetch SAP website

this demo just a little tool very useful to fetch ajax data .

it use caperJs  so ,if you want to use it ,

you should install the PhantomJs and casperJs .

## usage

`casperjs fetch.js <url> <uniqReg>`

for example,I want to fetch http://example.com,

It's a Single page application . it's data rendered by ajax .

the data's url was unique . like there's "aboutShop.update" in it.

we type it in terminal:

`casperjs fetch.js http://example.com aboutShop.update`

### done

finally,you could see the data saves to current directory named data.text.

done.
