// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information


const custom_views = {};








custom_views.keypress_rotation_practice = function(config) {

    const keypress_rotation_practice_function = {
        key_press: function (config, CT, magpie, answer_container_generator, startingTime) {

            $(".magpie-view").append(answer_container_generator(config, CT));

            const handleKeyPress = function(e) {
                const keyPressed = String.fromCharCode(
                    e.which
                ).toLowerCase();

                if (keyPressed === config.data[CT].key1 || keyPressed === config.data[CT].key2) {
                    let correctness;
                    const RT = Date.now() - startingTime; // measure RT before anything else

                    if (
                        config.data[CT].expected ===
                        config.data[CT][keyPressed.toLowerCase()]
                    ) {
                        correctness = "correct";
                        // show feedback (for practice trial only)
                        $(".magpie-view-stimulus").addClass("magpie-invisible");
                        $('#feedback').text('Correct!');
                    } else {
                        correctness = "incorrect";
                        // show feedback (for practice trial only)
                        $(".magpie-view-stimulus").addClass("magpie-invisible");
                        $('#feedback').text('Incorrect!');
                    }

                    let trial_data = {
                        trial_name: config.name,
                        trial_number: CT + 1,
                        key_pressed: keyPressed,
                        correctness: correctness,
                        RT: RT
                    };

                    trial_data[config.data[CT].key1] =
                        config.data[CT][config.data[CT].key1];
                    trial_data[config.data[CT].key2] =
                        config.data[CT][config.data[CT].key2];

                    trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                    magpie.trial_data.push(trial_data);
                    $("body").off("keydown", handleKeyPress);
                    setTimeout(magpie.findNextView, 400); // delay to accomodate feedback                    
                    magpie.findNextView();
                }
            };

            $("body").on("keydown", handleKeyPress);
        }

    };
    
    return keypress_rotation_practice_function;
};



custom_views.keypress_rotation_main = function(config) {

    const keypress_rotation_main_function = {
        key_press: function (config, CT, magpie, answer_container_generator, startingTime) {

            $(".magpie-view").append(answer_container_generator(config, CT));

            const handleKeyPress = function(e) {
                const keyPressed = String.fromCharCode(
                    e.which
                ).toLowerCase();

                if (keyPressed === config.data[CT].key1 || keyPressed === config.data[CT].key2) {
                    let correctness;
                    const RT = Date.now() - startingTime; // measure RT before anything else

                    if (
                        config.data[CT].expected ===
                        config.data[CT][keyPressed.toLowerCase()]
                    ) {
                        correctness = "correct";
                    } else {
                        correctness = "incorrect";
                    }

                    let trial_data = {
                        trial_name: config.name,
                        trial_number: CT + 1,
                        key_pressed: keyPressed,
                        correctness: correctness,
                        RT: RT
                    };

                    trial_data[config.data[CT].key1] =
                        config.data[CT][config.data[CT].key1];
                    trial_data[config.data[CT].key2] =
                        config.data[CT][config.data[CT].key2];

                    trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                    magpie.trial_data.push(trial_data);
                    $("body").off("keydown", handleKeyPress);
                    magpie.findNextView();
                }
            };

            $("body").on("keydown", handleKeyPress);
        }

    };

    return keypress_rotation_main_function;

};