// tsdown flattens the directory due to only having `components` directory
// making it the lowest common ancestor, which tsdown uses to identify
// where to put your files when using glob patterns in 'entry'
// need to have this for now, will remove when there are more things added
