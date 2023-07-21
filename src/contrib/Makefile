all = p4thcson

.PHONY: $(all)

all: $(all)

p4thcson: 
	(git clone https://github.com/positively4th/p4thcson.git || echo) \
	&& (cd p4thcson && git pull) \
	&& ([ -f "p4thcson/Makefile" ] && make -C p4thcson || echo)

clean: 
	rm -rf $(all)


