.class final La/g/i/r;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/view/View$OnApplyWindowInsetsListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/i/s;->a(Landroid/view/View;La/g/i/o;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation


# instance fields
.field final synthetic a:La/g/i/o;


# direct methods
.method constructor <init>(La/g/i/o;)V
    .locals 0

    iput-object p1, p0, La/g/i/r;->a:La/g/i/o;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onApplyWindowInsets(Landroid/view/View;Landroid/view/WindowInsets;)Landroid/view/WindowInsets;
    .locals 1

    invoke-static {p2}, La/g/i/C;->a(Ljava/lang/Object;)La/g/i/C;

    move-result-object p2

    iget-object v0, p0, La/g/i/r;->a:La/g/i/o;

    invoke-interface {v0, p1, p2}, La/g/i/o;->a(Landroid/view/View;La/g/i/C;)La/g/i/C;

    move-result-object p1

    invoke-static {p1}, La/g/i/C;->a(La/g/i/C;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroid/view/WindowInsets;

    return-object p1
.end method
