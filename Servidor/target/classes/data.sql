insert into bus (id, modelo, placa) values (-1,'mibus1','100');
insert into bus (id, modelo, placa) values (-2,'mibus2','200');
insert into bus (id, modelo, placa) values (-3,'mibus3','300');
insert into bus (id, modelo, placa) values (-4,'mibus4','400');

insert into conductor (id, nombre, cedula, telefono, direccion) values (-1, 'person1', '001', '111', 'calle 1');
insert into conductor (id, nombre, cedula, telefono, direccion) values (-2, 'person2', '002', '222', 'calle 2');
insert into conductor (id, nombre, cedula, telefono, direccion) values (-3, 'person3', '003', '333', 'calle 3');
insert into conductor (id, nombre, cedula, telefono, direccion) values (-4, 'person4', '004', '444', 'calle 4');

insert into estacion (id, nombre ) values (-1, 'A');
insert into estacion (id, nombre ) values (-2, 'B');
insert into estacion (id, nombre ) values (-3, 'C');
insert into estacion (id, nombre ) values (-4, 'D');
insert into estacion (id, nombre ) values (-5, 'E');
insert into estacion (id, nombre ) values (-6, 'F');
insert into estacion (id, nombre ) values (-7, 'G');
insert into estacion (id, nombre ) values (-8, 'H');

insert into ruta (id,codigo) values (-1,'H1');
insert into ruta (id,codigo) values (-2,'F14');
insert into ruta (id,codigo) values (-3,'M81');
insert into ruta (id,codigo) values (-4,'59B');

insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-1,-1,-2);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-2,-2,-3);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-3,-3,-4);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-4,-4,-5);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-5,-3,-6);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-6,-6,-7);
insert into estacionx_estacion (id, estacion_origen_id, estacion_destino_id) values (-7,-4,-8);

insert into estacion_rutas (id, estacion_id, ruta_id) values (-1, -1, -1);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-2, -2, -1);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-3, -3, -2);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-4, -4, -2);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-5, -5, -3);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-6, -6, -3);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-7, -7, -3);
insert into estacion_rutas (id, estacion_id, ruta_id) values (-8, -8, -4);

insert into horario_bus(id, fecha, bus_id, ruta_id) values (-1, TO_DATE('17/03/2020','DD/MM/YYYY'),-1,-1);
insert into horario_bus(id, fecha, bus_id, ruta_id) values (-2, TO_DATE('18/03/2020','DD/MM/YYYY'),-2,-2);
insert into horario_bus(id, fecha, bus_id, ruta_id) values (-3, TO_DATE('19/03/2020','DD/MM/YYYY'),-3,-3);
insert into horario_bus(id, fecha, bus_id, ruta_id) values (-4, TO_DATE('20/03/2020','DD/MM/YYYY'),-4,-4);
insert into horario_bus(id, fecha, bus_id, ruta_id) values (-5, TO_DATE('21/03/2020','DD/MM/YYYY'),-4,-3);

insert into horario_conductor(id, fecha, bus_id, conductor_id) values (-1, TO_DATE('17/03/2020','DD/MM/YYYY'),-1,-1);
insert into horario_conductor(id, fecha, bus_id, conductor_id) values (-2, TO_DATE('18/03/2020','DD/MM/YYYY'),-2,-2);
insert into horario_conductor(id, fecha, bus_id, conductor_id) values (-3, TO_DATE('19/03/2020','DD/MM/YYYY'),-3,-3);
insert into horario_conductor(id, fecha, bus_id, conductor_id) values (-4, TO_DATE('20/03/2020','DD/MM/YYYY'),-4,-4);

insert into horario_ruta(id, fecha_inicio, fecha_fin , ruta_id) values (-1, TO_DATE('17/03/2020 02:00','DD/MM/YYYY HH:MI'), TO_DATE('18/03/2020 02:00','DD/MM/YYYY HH:MI'),-1);
insert into horario_ruta(id, fecha_inicio, fecha_fin , ruta_id) values (-2, TO_DATE('18/03/2020 03:00','DD/MM/YYYY HH:MI'), TO_DATE('19/03/2020 03:00','DD/MM/YYYY HH:MI'),-2);
insert into horario_ruta(id, fecha_inicio, fecha_fin , ruta_id) values (-3, TO_DATE('19/03/2020 04:00','DD/MM/YYYY HH:MI'), TO_DATE('20/03/2020 04:00','DD/MM/YYYY HH:MI'),-3);
insert into horario_ruta(id, fecha_inicio, fecha_fin , ruta_id) values (-4, TO_DATE('20/03/2020 05:00','DD/MM/YYYY HH:MI'), TO_DATE('21/03/2020 05:00','DD/MM/YYYY HH:MI'),-4);
insert into horario_ruta(id, fecha_inicio, fecha_fin , ruta_id) values (-5, TO_DATE('21/03/2020 05:00','DD/MM/YYYY HH:MI'), TO_DATE('22/03/2020 05:00','DD/MM/YYYY HH:MI'),-4);
