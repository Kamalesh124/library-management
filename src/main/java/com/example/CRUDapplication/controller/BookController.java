package com.example.CRUDapplication.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.example.CRUDapplication.model.Book;
import com.example.CRUDapplication.repo.BookRepo;


@RestController
public class BookController {
   
    @Autowired  //For automatically creating object
    private BookRepo bookRepo;



     @GetMapping("/getAllBooks")
     public ResponseEntity<List<Book>> getAllBooks(){
         try {
             List<Book> bookList=new ArrayList<>();
             bookRepo.findAll().forEach(bookList::add);

             if(bookList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
             }

             return new ResponseEntity<>(bookList,HttpStatus.OK);
            
         } catch (Exception e) {
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }


     @GetMapping("/getBookById/{id}")
public ResponseEntity<Book> getBookById(@PathVariable Long id) {
    try {
        Optional<Book> bookData = bookRepo.findById(id);

        if (bookData.isPresent()) {
            return new ResponseEntity<>(bookData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        // Log the error for further investigation
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

     @PostMapping("/addBook")
     public ResponseEntity<Book> addBook(@RequestBody Book book){
         Book bookobj=bookRepo.save(book);
         
         return new ResponseEntity<>(bookobj,HttpStatus.OK);
     }


     @PostMapping("/updateBookById/{id}")
     public ResponseEntity<Book> updateBookById(@PathVariable Long id, @RequestBody Book newBookData) {
         try {
             Optional<Book> oldBookData = bookRepo.findById(id);
     
             if (oldBookData.isPresent()) {
                 Book updatedBookData = oldBookData.get();
                 updatedBookData.setTitle(newBookData.getTitle());
                 updatedBookData.setAuthor(newBookData.getAuthor());
     
                 Book bookObj = bookRepo.save(updatedBookData);
                 return new ResponseEntity<>(bookObj, HttpStatus.OK);
             }
     
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         } catch (Exception e) {
             // Log the error and print the stack trace
             e.printStackTrace();
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
     
     


     @DeleteMapping("/deleteBookById/{id}")
     public ResponseEntity<HttpStatus>  deleteBookById(@PathVariable Long id){
          bookRepo.deleteById(id);
          return new ResponseEntity<>(HttpStatus.OK);
     }
}
