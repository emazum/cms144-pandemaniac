(async () => {
    let loc = window.location.pathname
        , id = loc.substr(loc.lastIndexOf('/') + 1, loc.length);

    // Get the adjacency list and positions
    let adj = await d3.json('/api/v1/graph/' + id + '/structure');
    let pos = await d3.json('/api/v1/graph/' + id + '/layout');

    function computeNodes(refs) {
        return $.map(adj, function (value, key) {
            var node = refs[key];

            if (node) {
                delete node.team;
            } else {
                refs[key] = { id: key, x: pos[key].x, y: pos[key].y };
            }

            return refs[key];
        });
    };

    let max_x, min_x, max_y, min_y;
    let refs = {}
        , nodes = computeNodes(refs)
        , links = d3.merge(nodes.map(function (source) {
            return adj[source.id].map(function (targetId) {
                return {
                    source: refs[source.id]
                    , target: refs[targetId]
                };
            });
        }));

    // Set the connectivity of nodes
    const linkedById = {};
    links.forEach(d => {
        linkedById[`${d.source.id},${d.target.id}`] = 1;
    });

    function isConnected(a, b) {
        return linkedById[`${a.id},${b.id}`] || linkedById[`${b.id},${a.id}`] || a.id === b.id;
    }

    // Configure the tooltip
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Set the size of the graph
    let width = +d3.select('#chart').style('width').slice(0, -2)
        , height = $(window).height() * 0.5
        , radius = 3
        , transform = d3.zoomIdentity;

    // Append canvas to chart
    let canvas = d3.select('#chart')
        .append("canvas")
        .attr('width', width)
        .attr('height', height);

    let context = canvas.node().getContext('2d');

    // Dummy DOM for data binding
    let customBase = document.createElement('custom');
    let custom = d3.select(customBase);

    // Configure force simulation
    let simulation = d3.forceSimulation(nodes)
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("link", d3.forceLink(links))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    simulation.nodes(nodes);
    simulation.force('link')
        .links(links);

    // Bind data to link
    let link = custom.selectAll("custom.line")
        .data(links)
        .join("custom.line");
    link
        .attr("stroke", "lightgray")
        .attr("stroke-opacity", 0.2)

    // Bind data to node
    let node = custom.selectAll("custom.circle")
        .data(nodes)
        .join("custom.circle");
    node
        .attr("fill", "darkgray")
        .attr("stroke", "lightgray")
        .attr('fill-opacity', 1)

    let initial_end = true;
    let initial_start = false;

    let zoom = d3.zoom()
        .scaleExtent([1 / 10, 10])
        .on("zoom", (event) => {
            initial_start = true;
            transform = event.transform;
        });

    // turn off the simulation for large graph
    if (nodes.length > 2000) {
        simulation.stop();
        simulation.alphaMin(0.3);
        // set simulation max time to be 5 secs
        let startTime = Date.now();
        while ((Date.now() - startTime < 5000) && (simulation.alpha() > simulation.alphaMin())) {
            simulation.tick();
        }
        ticked();
    } else {
        simulation.on('tick', ticked);
    }

    simulation.on("end", () => {
        initial_end = false;
    })

    canvas.node().onmousedown = function () {
        initial_end = false;
    }

    canvas.node().onwheel = function () {
        initial_end = false;
    }

    d3.select(canvas.node())
        .call(d3.drag()
            .container(canvas.node())
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .call(zoom)
    // .call(render);



    // Simulation ticking function
    function ticked() {
        max_x = Number.MIN_SAFE_INTEGER;
        min_x = Number.MAX_SAFE_INTEGER;
        max_y = Number.MIN_SAFE_INTEGER;
        min_y = Number.MAX_SAFE_INTEGER;
        // Update bound data
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => {
                max_x = Math.max(max_x, d.x);
                min_x = Math.min(min_x, d.x);
                return d.x;
            })
            .attr("cy", d => {
                max_y = Math.max(max_y, d.y);
                min_y = Math.min(min_y, d.y);
                return d.y;
            });

        if (!initial_end) return;
        let k = Math.min(width / (max_x - min_x), height / (max_y - min_y));
        d3.select(canvas.node())
            .transition()
            .duration(0)
            .call(zoom.transform, d3.zoomIdentity
                .translate(0, 0)
                .scale(k)
                .translate(-(max_x + min_x) / 2, -(max_y + min_y) / 2)
                .translate(width / 2 / k, height / 2 / k)
            );
    }

    // Render function
    function render(c, hidden) {
        context = c.node().getContext('2d');
        context.save();
        context.clearRect(0, 0, width, height);
        context.translate(transform.x, transform.y);
        context.scale(transform.k, transform.k);
        // render links
        link.each(function (d, i) {
            let l = d3.select(this);
            context.beginPath();
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
            context.globalAlpha = l.attr('stroke-opacity');
            context.strokeStyle = l.attr('stroke');
            context.stroke();
        });
        // render nodes
        node.each(function (d, i) {
            let n = d3.select(this);
            context.beginPath();
            context.globalAlpha = n.attr('fill-opacity');
            context.fillStyle = hidden ? n.attr('fill-hidden') : n.attr('fill');
            context.strokeStyle = n.attr('stroke')
            context.moveTo(d.x + radius, d.y);
            context.arc(d.x, d.y, radius, 0, Math.PI * 2);
            context.fill();
            context.stroke();
        })
        context.restore();
    }

    function draw() {
        if (!initial_start) return;
        return render(canvas, false);
    }

    d3.timer(draw);

    // Dragging, zooming and panning
    function dragsubject(event) {
        let ex = transform.invertX(event.x),
            ey = transform.invertY(event.y)
        let node = simulation.find(ex, ey);
        let dx = ex - node.x,
            dy = ey - node.y;
        if (dx * dx + dy * dy < radius * radius) {
            node.rx = node.x;
            node.ry = node.y;
            node.x = transform.applyX(node.rx);
            node.y = transform.applyY(node.ry);
            return node;
        }
        return null;
    }

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.rx;
        event.subject.fy = event.subject.ry;
    }

    function dragged(event) {
        event.subject.fx = transform.invertX(event.x);
        event.subject.fy = transform.invertY(event.y);
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    // Mouseover tooltip function
    let prevOn = null;
    canvas.on('mousemove', function (event) {
        let ref = d3.pointer(event, canvas.node());
        let mouseX = transform.invertX(ref[0]);
        let mouseY = transform.invertY(ref[1]);
        let n = simulation.find(mouseX, mouseY, radius);
        if (n) {
            let nodeData = d3.select(node.nodes()[parseInt(n["id"])]).datum();
            mouseoverTooltip(nodeData, event);
            prevOn = nodeData;
            fade(nodeData, 0.05, 1, 0.02, true);
        } else {
            if (prevOn) {
                mouseoutTooltip();
                fade(prevOn, 1, 0.2, 0.2, false)
            }
            prevOn = null;
        }
    })

    // Click function
    canvas.on('click', function (event) {
        let ref = d3.pointer(event, canvas.node());
        let mouseX = transform.invertX(ref[0]);
        let mouseY = transform.invertY(ref[1]);
        let n = simulation.find(mouseX, mouseY, radius);
        if (n) {
            let nodeSel = d3.select(node.nodes()[parseInt(n["id"])]);
            clicked(nodeSel);
        }
    });

    // Fade other nodes except for mouseover and its neighbor nodes
    function fade(d, node_opacity, before_link_opacity, after_link_opacity, entering) {
        node.attr('fill-opacity', function (o) {
            let highlightOpacity = d3.select(this).attr('highlight-opacity');
            let thisOpacity;
            if (entering) {
                thisOpacity = isConnected(d, o) ? 1 : (highlightOpacity ? highlightOpacity : node_opacity);
            } else {
                thisOpacity = isConnected(d, o) ? (highlightOpacity ? highlightOpacity : 1) : (highlightOpacity ? highlightOpacity : node_opacity);
            }
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });
        link.attr('stroke-opacity', o => (o.source === d || o.target === d ? before_link_opacity : after_link_opacity));
    }

    // Tooltip functions
    function mouseoverTooltip(node, event) {
        tooltip.transition()
            .duration(100)
            .style('opacity', .8);
        let htmlStr = "<p>ID: " + node["id"] + "</p>";
        if (node.teams) {
            htmlStr += "<p>Seeded by: <ul>";
            for (let team of node.teams) {
                htmlStr += `<li style="color: ${colors[team]}">` + team + "</li>";
            }
            htmlStr += "</ul></p>";
        }
        tooltip.html(htmlStr)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY + 10 + "px");
    }

    function mouseoutTooltip() {
        tooltip.transition()
            .duration(100)
            .style("opacity", 0);
    }

    // Node click function
    let active = d3.select(null);
    function clicked(nodeSel) {
        if (active.node() === nodeSel.node()) {
            active.classed("active", false);
            return reset();
        }
        active = nodeSel.classed("active", true);
        d3.select(canvas.node())
            .transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity
                .translate(0, 0)
                .scale(8)
                .translate(-(+active.attr('cx')), -(+active.attr('cy')))
                .translate(width / 16, height / 16))

    }

    function reset() {
        d3.select(canvas.node())
            .transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity
                .translate(0, 0)
                .scale(1));
    }

    // Game selection
    let selected_game = 0;
    $(".dropdown-menu li a").click(function () {
        let txt = $(this).text()
        $("#game-no").text(txt + " ");
        selected_game = parseInt(txt.split(' ')[1]);
        $('#step-no').val(0);
        step(0);
        previousInitialSelections = currentInitialSelections;
        currentInitialSelections = getInitialSelections(selected_game)
        drawInitialSelections();
    })


    // Coloring nodes
    let colors = {}
        , num_colors = 0;
    let items = {};
    let uncolored = 'uncolored';

    function applyDiff(refs, diff) {
        if (diff) {
            $.each(diff, function (key, values) {
                $.each(values, function (i, value) {
                    // Subtract nodes that were taken
                    var old = refs[value].team ? refs[value].team : uncolored;
                    items[old].score -= 1;

                    refs[value].team = key;
                });

                // Add new nodes reached
                items[key].score += values.length;
            });
        }
    };

    let iterations = await d3.json('/api/v1/graph/' + id + '/iteration');
    let previousInitialSelections = {};
    let currentInitialSelections = getInitialSelections(0);


    function drawInitialSelections() {
        // Delete all previous team selection
        for (let nodeId of Object.keys(previousInitialSelections)) {
            node
                .filter(function (d) {
                    if (nodeId === d.id) {
                        return d;
                    }
                })
                .datum((d) => {
                    delete d["teams"];
                    return d;
                })
        }
        // Insert the team selection of each node into its data
        for (let nodeId of Object.keys(currentInitialSelections)) {
            node
                .filter(function (d) {
                    if (nodeId === d.id) {
                        return d;
                    }
                })
                .datum((d) => {
                    let new_d = d;
                    new_d["teams"] = currentInitialSelections[nodeId];
                    return new_d;
                })
        }
    }

    function getInitialSelections(game) {
        temp = iterations[game]["-1"]
        res = {}
        for (const [key, values] of Object.entries(temp)) {
            for (const value of values) {
                if (value in res) {
                    res[value].push(key)
                } else {
                    res[value] = [key]
                }
            }
        }
        return res;
    }

    function makeLegend(items) {
        let list = $('<ul class="nav nav-pills nav-stacked">');
        $.each(items, function (key, value) {
            let item = $(`<li id=${key}></li>`)
                , link = $('<a></a>')
                , badge = $('<span class="badge pull-right"></span>');

            link.text(key);
            badge.attr('id', key);
            badge.text(value.score);
            badge.css('background-color', value.color);

            link.append(badge);
            item.append(link);
            list.append(item);
        });
        list.append($('</ul>'));
        $('#legend').append(list);
    }

    function updateLegend(items) {
        $.each(items, function (key, value) {
            let badge = $(`#legend li #${key}`);
            badge.text(value.score);
        });
        highlightTeams();
    };

    let num_teams = Object.keys(iterations[selected_game]['0']).length;
    let color = d3.scaleSequential(d3.interpolateTurbo);

    $.each(iterations[selected_game]['0'], function (key, values) {
        colors[key] = color(++num_colors / num_teams);
    });

    drawInitialSelections();

    // Set up the legend
    function computeItems() {
        items[uncolored] = { color: 'black', score: nodes.length };

        $.each(iterations[selected_game]['0'], function (key, values) {
            items[key] = { color: colors[key], score: 0 };
        });
    };
    computeItems();
    makeLegend(items);

    // Highlight team initial node selections by clicking on legend
    let selectedTeams = []
    let highlightedNodes = new Set();
    $("#legend li:not(:first-of-type)").click(function () {
        $(this).toggleClass("selected");
        if ($(this).hasClass("selected")) {
            selectedTeams.push($(this).attr("id"));
        } else {
            selectedTeams = selectedTeams.filter(e => e !== $(this).attr("id"));
        }
        highlightTeams();
    })

    function highlightTeams() {
        const dimmedOpacity = 0.25;
        highlightedNodes = new Set();
        for (let team of selectedTeams) {
            let curNodes = new Set(iterations[selected_game]["-1"][team]);
            highlightedNodes = new Set([...highlightedNodes, ...curNodes]);
        }
        if (highlightedNodes.size > 0) {
            link.attr('stroke-opacity', (o) => 0.2);
            node.transition('fill-opacity')
                .duration(300)
                .attr('fill-opacity', (d) => {
                    if (highlightedNodes.has(d.id)) {
                        return 1;
                    } else {
                        return dimmedOpacity;
                    }
                }
                )
                .attr('highlight-opacity', function (d) {
                    if (highlightedNodes.has(d.id)) {
                        return 1;
                    } else {
                        return dimmedOpacity;
                    }
                });
        } else {
            link.attr('stroke-opacity', (o) => 0.2);
            node.transition('fill-opacity')
                .duration(300)
                .attr('fill-opacity', 1)
                .attr('highlight-opacity', null);
        }

    }

    var applied = -1;
    function step(size) {
        var stepNo = +$('#step-no').val()
            , remain;
        // Starting from step that was already applied,
        // ...or a decrement
        if (stepNo < applied || size <= 0) {
            computeNodes(refs);
            computeItems();
            remain = stepNo + size;
            applied = -1;
            stepNo = 0;
        }
        // Otherwise, an increment
        else {
            let max_iterations = Object.keys(iterations[selected_game]).length;
            if (stepNo >= max_iterations - 1) {
                remain = 0;
                stepNo = max_iterations - 1;
            } else {
                remain = size;
            }
        }

        while (remain > 0) {
            applyDiff(refs, iterations[selected_game][stepNo]);
            applied++;
            stepNo++;
            remain--;
        }

        // color the nodes
        node.data(nodes)
            .transition('fill')
            .duration(500)
            .attr('fill', function (d) {
                if (d.team) {
                    return colors[d.team];
                }
                return 'darkgray';
            });
        updateLegend(items);

        $('#step-no').val(stepNo);
    };

    function run(delay) {
        let simulation = null;
        let state = 'pause';

        $('#play').click(function () {
            // Prevent simultaneous updates
            if (simulation) {
                clearInterval(simulation);
            }

            if (state === 'pause') {
                state = 'play';
                $('#play i').removeClass('glyphicon-play');
                $('#play i').addClass('glyphicon-pause');
                simulation = setInterval(function () {
                    if (state === 'pause') {
                        return clearInterval(simulation);
                    }
                    let stepNo = +$('#step-no').val();

                    // Check when reached end of simulation
                    if (!iterations[selected_game].hasOwnProperty(stepNo)) {
                        return clearInterval(simulation);
                    }

                    step(1);
                }, delay);
            } else {
                state = 'pause';
                $('#play i').removeClass('glyphicon-pause');
                $('#play i').addClass('glyphicon-play');
            }
        });

        $('#step-forward').click(function () {
            if (simulation) {
                clearInterval(simulation);
            }

            step(1);
        });

        $('#step-backward').click(function () {
            if (simulation) {
                clearInterval(simulation);
            }

            step(-1);
        });

        $('#step-no').on('keypress', function (e) {
            if (e.key === "Enter") {
                step(0);
            }
        })
    };

    run(1000);
})();