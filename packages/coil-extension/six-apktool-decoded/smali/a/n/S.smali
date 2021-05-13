.class La/n/S;
.super Ljava/lang/Object;
.source ""


# direct methods
.method static a(Landroid/view/ViewGroup;)La/n/Q;
    .locals 2

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x12

    if-lt v0, v1, :cond_0

    new-instance v0, La/n/P;

    invoke-direct {v0, p0}, La/n/P;-><init>(Landroid/view/ViewGroup;)V

    return-object v0

    :cond_0
    invoke-static {p0}, La/n/O;->a(Landroid/view/ViewGroup;)La/n/O;

    move-result-object p0

    return-object p0
.end method

.method static a(Landroid/view/ViewGroup;Z)V
    .locals 2

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x12

    if-lt v0, v1, :cond_0

    invoke-static {p0, p1}, La/n/V;->a(Landroid/view/ViewGroup;Z)V

    goto :goto_0

    :cond_0
    invoke-static {p0, p1}, La/n/U;->a(Landroid/view/ViewGroup;Z)V

    :goto_0
    return-void
.end method
