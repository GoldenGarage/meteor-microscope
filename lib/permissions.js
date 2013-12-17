// check that the userId specified owns the documents
isOwner = function( userId, doc ) 
{
    return doc && doc.userId === userId;
}
