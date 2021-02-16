#!/usr/bin/perl

my $USERID=$ENV{"REMOTE_USER"};
my $TOKEN = "a23Ta13q";
print "Location: https://stencil.biohpc.cornell.edu:3000?$TOKEN&$USERID\n\n";



