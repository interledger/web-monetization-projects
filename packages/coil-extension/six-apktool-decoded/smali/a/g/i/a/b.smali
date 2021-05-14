.class public final La/g/i/a/b;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/g/i/a/b$a;,
        La/g/i/a/b$b;
    }
.end annotation


# direct methods
.method public static a(Landroid/view/accessibility/AccessibilityManager;La/g/i/a/b$a;)Z
    .locals 3

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x0

    const/16 v2, 0x13

    if-lt v0, v2, :cond_1

    if-nez p1, :cond_0

    return v1

    :cond_0
    new-instance v0, La/g/i/a/b$b;

    invoke-direct {v0, p1}, La/g/i/a/b$b;-><init>(La/g/i/a/b$a;)V

    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityManager;->addTouchExplorationStateChangeListener(Landroid/view/accessibility/AccessibilityManager$TouchExplorationStateChangeListener;)Z

    move-result p0

    return p0

    :cond_1
    return v1
.end method

.method public static b(Landroid/view/accessibility/AccessibilityManager;La/g/i/a/b$a;)Z
    .locals 3

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x0

    const/16 v2, 0x13

    if-lt v0, v2, :cond_1

    if-nez p1, :cond_0

    return v1

    :cond_0
    new-instance v0, La/g/i/a/b$b;

    invoke-direct {v0, p1}, La/g/i/a/b$b;-><init>(La/g/i/a/b$a;)V

    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityManager;->removeTouchExplorationStateChangeListener(Landroid/view/accessibility/AccessibilityManager$TouchExplorationStateChangeListener;)Z

    move-result p0

    return p0

    :cond_1
    return v1
.end method
